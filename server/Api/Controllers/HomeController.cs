using Api.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly PodcastService _podcastService;

        public HomeController(PodcastService eventService)
        {
            _podcastService = eventService;
        }

        [HttpGet]
        public IActionResult GetPodcastFeed()
        {
            var result = _podcastService.GetPodcastFeed();
            return new OkObjectResult(ApiResponse.Create(result));
        }
    }
}