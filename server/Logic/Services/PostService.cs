using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class PostService
    {
        private readonly DatabaseContext _context;
    

    public PostService(DatabaseContext context) 
    {
        _context = context;
    }

        public async Task<PostDto> CreatePost(PostDto post)
        {

            var newPost = new Post()
            {
                Content = post.Content,
                EventId = post.EventId,
                CreatorId = post.CreatorId,
                Created = DateTime.Now
            };
            
            _context.Posts.Add(newPost);

            await _context.SaveChangesAsync();
            return PostForCreateTranslator.ToModel(newPost);
        }

    }
}
