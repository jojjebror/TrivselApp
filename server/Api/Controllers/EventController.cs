using System.Threading.Tasks;
using Api.Models;
using Logic.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class EventController : Controller
    {
        private readonly EventService _eventService;

        public EventController(EventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var result = await _eventService.GetEvents();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var result = await _eventService.GetEvent(id);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody]EventForCreateDto ev)
        {
            var result = await _eventService.CreateEvent(ev);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody]EventForUpdateDto ev)
        {
            var result = await _eventService.UpdateEvent(id , ev);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var result = await _eventService.DeleteEvent(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }

        [HttpPost("{eventId}/{userId}")]
        public async Task<IActionResult> AcceptInvitation(int eventId, int userId)
        {
            var accepted = await _eventService.GetInvitation(eventId, userId);

            if (accepted != null)
                return BadRequest("Already accepted");

            var result = await _eventService.CreateInvite(eventId, userId);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost("{id}/uploadimage")]
        //[Route("uploadimage")]
        public async Task<IActionResult> UploadImage(int id)
        {
            var httpRequest = Request.Form;
            var image = httpRequest.Files["image"];

            var result = await _eventService.UploadImage(id, image);

            return new OkObjectResult(ApiResponse.Create(result));
        }

    }
}