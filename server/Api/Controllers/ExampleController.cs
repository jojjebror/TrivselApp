using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Logic.Services;
using Logic.Database.Entities;
using System.Threading.Tasks;
using Api.Models;
using Logic.Models;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class ExampleController : Controller
    {

        private readonly ExampleService _exampleService;

        public ExampleController(ExampleService exampleService)
        {
            _exampleService = exampleService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _exampleService.List();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ExampleDto example)
        {
            var result = await _exampleService.Create(example);
            return new OkObjectResult(ApiResponse.Create(result));
        }

    }
}
