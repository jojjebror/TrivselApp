using Logic.Authentication;
using Logic.Database;
using Logic.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    public static class Init
    {
        public static void AddLogic(this IServiceCollection services, string connectionString)
        {
            services.AddScoped(_ => new DatabaseContext(connectionString));

            services.AddScoped<AuthenticatedUser>();

            services.AddScoped<ExampleService>();
            services.AddScoped<UserService>();
        }
    }
}
