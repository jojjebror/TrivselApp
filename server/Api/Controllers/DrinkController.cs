using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class DrinkController
    {

        private readonly DrinkService _drinkService;

        public DrinkController(DrinkService drinkService)
        {
            _drinkService = drinkService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDrinks()
        {
            var result = await _drinkService.GetDrinks();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrink(int id)
        {
            var result = await _drinkService.GetDrink(id);
            return new OkObjectResult(ApiResponse.Create(result));
        }
    }
}