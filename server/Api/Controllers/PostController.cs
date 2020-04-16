using Api.Models;
using Logic.Models;
using Logic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class PostController : Controller
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody]PostDto post)
        {
            var result = await _postService.CreatePost(post);
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpDelete("{id}/{eventId}")]
        public async Task<IActionResult> DeletePost(int id, int eventId)
        {
            var result = await _postService.DeletePost(id, eventId);
            return new OkObjectResult(ApiResponse.Delete(result));
        }
    }
}

