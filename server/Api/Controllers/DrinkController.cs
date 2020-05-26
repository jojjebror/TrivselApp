using System.Threading.Tasks;
using Api.Models;
using Logic.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;

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
        //Gets all drinks.
        [HttpGet]
        public async Task<IActionResult> GetDrinks()
        {
            var result = await _drinkService.GetDrinks();
            return new OkObjectResult(ApiResponse.Create(result));
        }
        //Gets a specific drink based on it's id.
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrink(int id)
        {
            var result = await _drinkService.GetDrink(id);
            return new OkObjectResult(ApiResponse.Create(result));
        }
        //Gets specific drinks based on their category.
        [HttpGet("filter")]
        public async Task<ActionResult> FilterDrinks(string filter)
        {
            var result = await _drinkService.FilterDrink(filter);
            return new OkObjectResult(ApiResponse.Create(result));
        }
        //Creates a new drink. 
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]DrinkForListDto drink)
        {
            var result = await _drinkService.Create(drink);
            return new OkObjectResult(ApiResponse.Create(result));
        }
        //Uploads an image to the drink. 
        [HttpPost("{id}/uploadDrinkImage")]
        public async Task<IActionResult> UploadDrinkImage(int id)
        {
            var httpRequest = Request.Form;
            var image = httpRequest.Files["image"];

            var result = await _drinkService.UploadDrinkImage(id, image);

            return new OkObjectResult(ApiResponse.Create(result));
        }
        //Deletes a drink based on it's id. 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrink(int id)
        {
            var result = await _drinkService.DeleteDrink(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }
        //Updates information about the drink. 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDrink(int id,[FromBody]DrinkForUpdateDto dr)
        {
            var result = await _drinkService.Update(id, dr);

            return new OkObjectResult(ApiResponse.Create(result));
        }

    } 

}