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
        public async Task<IActionResult> AddEventParticipantStatus(int eventId, int userId, [FromBody]string answer)
        {

            var result = await _eventService.AddEventParticipantStatus(eventId, userId, answer);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost("{eventId}/{userId}/update")]
        public async Task<IActionResult> UpdateParticipantStatus(int eventId, int userId, [FromBody]string answer)
        {

            var result = await _eventService.UpdateParticipantStatus(eventId, userId, answer);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost("{id}/saveimage")]
        public async Task<IActionResult> SaveImage(int id)
        {
            var httpRequest = Request.Form;
            var image = httpRequest.Files["image"];

            var result = await _eventService.SaveImage(id, image);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("{id}/getimage")]
        public async Task<IActionResult> GetImage(int id)
        {
            var result = await _eventService.GetImage(id);

            var image = File(result, "image");

            return new OkObjectResult(ApiResponse.Create(image));
        }

        [HttpGet("{id}/getUserEvents")]
        public async Task<IActionResult> GetCurrentUserEvents(int id)
        {
            var result = await _eventService.GetCurrentUserEvents(id);
            return new OkObjectResult(ApiResponse.Create(result));
        }
    }
}