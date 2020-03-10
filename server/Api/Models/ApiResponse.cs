using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class ApiResponse
    {

        public static ApiResponse<T> Create<T>(T data)
        {
            return new ApiResponse<T>
            {
                Data = data
            };
        }

    }

    public class ApiResponse<T>
    {
        public T Data { get; set; }

    }
}
