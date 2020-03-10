using Api.Models;
using Logic.Error.Exceptions;
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
            var error = new ErrorDto { Message = "Ett oväntat fel uppstod" };
            var code = HttpStatusCode.InternalServerError;

            if (exception is RntlException)
            {
                error = (exception as RntlException).Error;

                if (exception is NotFoundException)
                    code = HttpStatusCode.NotFound;
                else if (exception is LoginException)
                    code = HttpStatusCode.OK;
                else if (exception is ValidationException)
                    code = HttpStatusCode.BadRequest;
            }

            var result = JsonConvert.SerializeObject(RntlResponse.CreateErrorResponse(error), new JsonSerializerSettings
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
        public static IApplicationBuilder UseRntlErrorResponse(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorResponseMiddleware>();
        }
    }
}
