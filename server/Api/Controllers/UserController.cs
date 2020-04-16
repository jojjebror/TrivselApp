using Api.Models;
using Logic.Models;
using Logic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserController
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Authenticated")]
        public async Task<IActionResult> GetAuthenticated()
        {
            var result = await _userService.GetAuthenticated();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _userService.GetUsers();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("credit")]
        public async Task<IActionResult> GetCredit()
        {
            var fetch = await _userService.GetCredit();
            return new OkObjectResult(ApiResponse.Create(fetch));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddCredit(int id, [FromBody] UserForUpdateDto user)
        {
            var fetch = await _userService.AddCredit(id, user);
            return new OkObjectResult(ApiResponse.Create(fetch));
        }
    }
}
