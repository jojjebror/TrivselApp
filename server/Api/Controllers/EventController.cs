using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> Create([FromBody]EventForCreateDto ev)
        {
            var result = await _eventService.Create(ev);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var result = await _eventService.Update(id , ev);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost("{id}/{userId}")]
        public async Task<IActionResult> AcceptInvitation(int id, int userId)
        {
            var accepted = await _eventService.GetInvitation(id, userId);

            if (accepted != null)
                return BadRequest("Already accepted");

            var result = await _eventService.CreateInvite(id, userId);

            return new OkObjectResult(ApiResponse.Create(result));
        }

    }
}