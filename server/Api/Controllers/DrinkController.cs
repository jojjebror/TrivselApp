﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;
using Logic.Models;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class DrinkController : Controller
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

        [HttpGet("filter")]
        public async Task<ActionResult> FilterDrinks(string filter)
        {
            var result = await _drinkService.FilterDrink(filter);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]DrinkForListDto drink)
        {
            var result = await _drinkService.Create(drink);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrink(int id)
        {
            var result = await _drinkService.DeleteDrink(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDrink(int id, [FromBody]DrinkForUpdateDto dr)
        {
            var result = await _drinkService.Update(id, dr);

            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet]
        public async Task<IActionResult> GetPrices(string name)
        {
            var result = await _drinkService.GetPriceClasses(name);
            return new OkObjectResult(ApiResponse.Create(result));
        }
    } 

}