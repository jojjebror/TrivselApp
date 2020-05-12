using Api.Models;
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
        public async Task<IActionResult> GetPodcastFeed()
        {
            var result = await _homeService.GetPodcastFeed();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("offices")]
        public async Task<IActionResult> GetOffices()
        { 
            var result = await _homeService.GetOffices();
            return new OkObjectResult(ApiResponse.Create(result));
        }
    }
}