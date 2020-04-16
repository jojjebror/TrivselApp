using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public async Task<EventForDetailedDto> DeletePost(int id, int eventId)
        {
            var dbPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);

            _context.Posts.Remove(dbPost);
            await _context.SaveChangesAsync();

            //return id;

            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
            .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventForDetailedTranslator.ToModel(dbEvent);

        }

    }
}
