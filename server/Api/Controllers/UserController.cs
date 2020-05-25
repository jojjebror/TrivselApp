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

        [HttpPut("{id}/{amount}")]
        public async Task<IActionResult> AddCredit(int id, int amount)
        {
            var fetch = await _userService.AddCredit(id, amount);
            return new OkObjectResult(ApiResponse.Create(fetch));
        }

        [HttpPut("UpdateOffice/{id}/{office}")]
        public async Task<IActionResult> UpdateOffice(int id, string office)
        {
            var result = await _userService.UpdateOffice(id, office);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPut("UpdateAdminStatus/{id}/{status}")]
        public async Task<IActionResult> UpdateAdminStatus(int id, string status)
        {
            var result = await _userService.UpdateAdminStatus(id, status);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }
    }
}
    