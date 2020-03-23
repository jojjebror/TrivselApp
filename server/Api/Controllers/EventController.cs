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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _eventService.Delete(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }

    }
}