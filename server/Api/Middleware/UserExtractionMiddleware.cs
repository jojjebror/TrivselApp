using Logic.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Middlewares
{
    public class UserExtractionMiddleware
    {

        private readonly RequestDelegate _next;

        public UserExtractionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext context, AuthenticatedUser authenticatedUser)
        {
            var userClaims = context.User?.Claims;

            if (userClaims != null)
                authenticatedUser.FromClaims(userClaims);

            return _next.Invoke(context);
        }

    }

    public static class UserExtractionMiddlewareExtensions
    {
        public static IApplicationBuilder UseUserExtraction(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserExtractionMiddleware>();
        }
    }
}
