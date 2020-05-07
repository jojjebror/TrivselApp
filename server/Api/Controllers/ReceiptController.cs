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

    public class ReceiptController : Controller
    {
        private readonly ReceiptService _receiptService;

        public ReceiptController(ReceiptService receiptService)
        {
            _receiptService = receiptService;
        }


        [HttpGet]
        public async Task<IActionResult> GetReceipts()
        {
            var result = await _receiptService.GetReceipt();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurrentReceipts(int id)
        {
            var result = await _receiptService.GetCurrentUserReceipts(id);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpPost("createReceipt")]
        public async Task<IActionResult> CreateReceipt([FromBody] ReceiptForCreateDto receipt)
        {
            var result = await _receiptService.CreateReceipt(receipt);
            return new ObjectResult(ApiResponse.Create(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceipt(int id)
        {
            var result = await _receiptService.DeleteReceipt(id);
            return new OkObjectResult(ApiResponse.Delete(result));
        }


        [HttpPost("{id}/uploadImageReceipt")]
        public async Task<IActionResult> UploadImageReceipt(int id)
        {
            var httpRequest = Request.Form;
            var image = httpRequest.Files["image"];

            var result = await _receiptService.UploadImage(id, image);

            return new OkObjectResult(ApiResponse.Create(result));
        }

    }
}