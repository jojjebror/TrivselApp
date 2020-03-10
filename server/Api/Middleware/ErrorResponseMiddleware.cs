using Api.Models;
using Logic.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Api.Middlewares
{
    public class ErrorResponseMiddleware
    {

        private readonly RequestDelegate _next;

        public ErrorResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var error = new ErrorDto {
                Message = "Ett oväntat fel uppstod"
            };
            var code = HttpStatusCode.InternalServerError;

            var result = JsonConvert.SerializeObject(error, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }

    public static class ErrorResponseMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorResponse(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorResponseMiddleware>();
        }
    }
}
