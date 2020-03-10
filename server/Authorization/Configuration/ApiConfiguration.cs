using Authorization.Options;
using IdentityServer4.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Configuration
{
    public class ApiConfiguration
    {
        public ApiResource ApiResource { get; }

        public ApiConfiguration(AuthenticationOptions options)
        {
            var config = options.Api;
            ApiResource = new ApiResource
            {
                Name = config.Name,
                DisplayName = config.DisplayName,
                Scopes = new Scope[] { new Scope("exApi") }
            };
        }
    }
}
