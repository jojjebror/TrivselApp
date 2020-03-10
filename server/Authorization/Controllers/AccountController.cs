using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using IdentityServer4.Events;
using IdentityServer4.Models;
using Authorization.Filters;
using Authorization.Services;
using Authorization.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Collections.Generic;
using Logic.Services;
using System.Linq;
using Logic.Models;
using IdentityServer4;

namespace Authorization.Controllers
{

    [SecurityHeaders]
    public class AccountController : Controller
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly AccountService _accountService;

        private readonly UserService _userService;

        public AccountController(
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IHttpContextAccessor httpContextAccessor,
            IAuthenticationSchemeProvider schemeProvider,
            UserService userService)
        {
            _interaction = interaction;
            _accountService = new AccountService(interaction, httpContextAccessor, schemeProvider, clientStore);
            _userService = userService;
        }

        /// <summary>
        /// Show login page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);

            // Check if external provider was chosen
            var context = await _interaction.GetAuthorizationContextAsync(returnUrl);
            var idp = context?.Parameters?.Get("IdP");
            if (idp != null)
            {
                return ExternalLogin(idp, returnUrl);
            }

            // Render local login view
            var vm = await _accountService.BuildLoginViewModelAsync(returnUrl);
            return View(vm);
        }

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string button)
        {
            if (button != "login")
            {
                // Cancel button was clicked
                var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);
                if (context != null)
                {
                    // Handle as if user denied concent
                    await _interaction.GrantConsentAsync(context, ConsentResponse.Denied);
                    return Redirect(model.ReturnUrl);
                }
                else
                {
                    return Redirect("~/");
                }
            }

            if (ModelState.IsValid)
            {
                var user = await _userService.Login(model.Email, model.Password);
                if (user != null)
                {
                    await LoginUser(user);

                    // Make sure the returnUrl is still valid, and if so redirect back to authorize endpoint or a local page
                    if (_interaction.IsValidReturnUrl(model.ReturnUrl) || Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }

                    return Redirect("~/");
                }

                ModelState.AddModelError("", "Felaktiga inloggningsuppgifter");
            }

            // Something went wrong, show form with error
            var vm = await _accountService.BuildLoginViewModelAsync(model);
            return View(vm);
        }


        /// <summary>
        /// Initiate roundtrip to external authentication provider
        /// </summary>
        [HttpGet]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var props = new AuthenticationProperties()
            {
                RedirectUri = Url.Action("ExternalLoginCallback"),
                Items =
                {
                    { "returnUrl", returnUrl }
                }
            };

            // Start challenge and roundtrip the return URL
            props.Items.Add("scheme", provider);
            return Challenge(props, provider);

        }

        [HttpGet]
        public async Task<IActionResult> ExternalLoginCallback()
        {
            // Get user from external auth and temporary signin
            var result = await HttpContext.AuthenticateAsync(IdentityServer4.IdentityServerConstants.ExternalCookieAuthenticationScheme);
            if (result?.Succeeded != true)
            {
                throw new Exception("External authentication error");
            }

            var provider = result.Properties.Items["scheme"];

            // Extract external user
            var externalUser = result.Principal;
            var externalClaims = externalUser.Claims.ToList();
            var externalIdentityId = externalClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            // Handle external login
            UserDto user;
            if (provider == "Google")
            {
                user = await _userService.FindByGoogleId(externalIdentityId);
                if (user == null)
                    user = await _userService.CreateFromGoogle(externalIdentityId, new UserDto
                    {
                        Name = externalClaims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value,
                        Email = externalClaims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value
                    });
            }
            else
            {
                throw new Exception("Unknown provider");
            }

            // Delete temporary cookie used during external authentication
            await HttpContext.SignOutAsync(IdentityServer4.IdentityServerConstants.ExternalCookieAuthenticationScheme);

            await LoginUser(user);

            // Validate return URL and redirect back to authorization endpoint or a local page
            var returnUrl = result.Properties.Items["returnUrl"];
            if (_interaction.IsValidReturnUrl(returnUrl) || Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return Redirect("~/");
        }


        /// <summary>
        /// Show logout page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var vm = await _accountService.BuildLogoutViewModelAsync(logoutId);

            if (vm.ShowLogoutPrompt == false)
            {
                return await Logout(vm);
            }

            return View(vm);
        }

        /// <summary>
        /// Handle logout page postback
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutViewModel model)
        {
            // build a model so the logged out page knows what to display
            var vm = await _accountService.BuildLoggedOutViewModelAsync(model.LogoutId);

            var user = HttpContext.User;
            if (user?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await HttpContext.SignOutAsync();
            }

            // check if we need to trigger sign-out at an upstream identity provider
            if (vm.TriggerExternalSignout)
            {
                // build a return URL so the upstream provider will redirect back
                // to us after the user has logged out. this allows us to then
                // complete our single sign-out processing.
                string url = Url.Action("Logout", new { logoutId = vm.LogoutId });

                // this triggers a redirect to the external provider for sign-out
                return SignOut(new AuthenticationProperties { RedirectUri = url }, vm.ExternalAuthenticationScheme);
            }

            return View("LoggedOut", vm);
        }

        private async Task LoginUser(UserDto user)
        {
            // Issue authentication cookie for user
            var claims = new List<Claim>
            {
                new Claim("sub", user.Id.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, IdentityServer4.IdentityServerConstants.DefaultCookieAuthenticationScheme);
            await HttpContext.SignInAsync(IdentityServer4.IdentityServerConstants.DefaultCookieAuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
        }

    }
}