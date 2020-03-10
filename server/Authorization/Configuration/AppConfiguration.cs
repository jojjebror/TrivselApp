using Authorization.Options;
using IdentityServer4.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Configuration
{
    public class AppConfiguration
    {
        public Client Client { get; }

        public AppConfiguration(AuthenticationOptions options)
        {
            var config = options.App;
            Client = new Client
            {
                ClientName = config.ClientName,
                ClientId = config.ClientId,
                AccessTokenType = AccessTokenType.Jwt,
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowAccessTokensViaBrowser = true,
                RedirectUris = new List<string> { config.RedirectUrl },
                PostLogoutRedirectUris = new List<string> { config.LogoutRedirectUrl },
                AllowedCorsOrigins = new List<string> { config.Url },
                AllowedScopes = new List<string> { "openid", "exApi" },
                RequireConsent = false
            };
        }
    }
}