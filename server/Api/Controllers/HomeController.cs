using Api.Models;
using Logic.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly HomeService _homeService;
        public HomeController(HomeService homeService)
        {
            _homeService = homeService;
        }

        [HttpGet("podcast")]
        public IActionResult GetPodcast()
        {
            var result = _homeService.GetPodcast();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("offices")]
        public async Task<IActionResult> GetOffices()
        { 
            var result = await _homeService.GetOffices();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffice(int id, [FromBody]OfficeDto office)
        {
            var result = await _homeService.UpdateOffice(id, office);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOffice([FromBody]OfficeDto office)
        {
            var result = await _homeService.CreateOffice(office);
            return new OkObjectResult(ApiResponse.Create(result));
        }
    }
}