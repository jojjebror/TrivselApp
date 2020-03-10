using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using IdentityServer4.Models;
using IdentityServer4;
using Logic;
using Authorization.Configuration;
using Authorization.Options;

namespace Authorization
{
    public class Startup
    {

        public IConfiguration Configuration { get; }


        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add Options
            var authenticationConfiguration = Configuration.GetSection("Authentication");
            var authenticationOptions = new AuthenticationOptions();
            authenticationConfiguration.Bind(authenticationOptions);
            services.Configure<AuthenticationOptions>(authenticationConfiguration);

            // Add Logic services
            services.AddLogic(Configuration.GetConnectionString("DefaultConnection"));

            // Configure IdentityServer4
            var apiConfiguration = new ApiConfiguration(authenticationOptions);
            var appConfiguration = new AppConfiguration(authenticationOptions);
            services.AddIdentityServer()
                .AddInMemoryClients(new List<Client>() { appConfiguration.Client })
                .AddInMemoryApiResources(new List<ApiResource>() { apiConfiguration.ApiResource })
                .AddInMemoryIdentityResources(new List<IdentityResource>()
                {
                    new IdentityResources.OpenId(),
                    new IdentityResources.Profile(),
                    new IdentityResources.Email(),
                    new IdentityResource {
                        Name = "role",
                        UserClaims = new List<string> { "role" }
                    }
                })
                .AddDeveloperSigningCredential();

            // Setup authentication
            services.AddAuthentication()
                .AddGoogle("Google", options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.ClientId = authenticationOptions.External.Google.ClientId;
                    options.ClientSecret = authenticationOptions.External.Google.ClientSecret;
                });

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .WithExposedHeaders("Content-Disposition");
            });

            app.UseIdentityServer();

            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
