using Logic.Database.Entities;
using Logic.Models;

namespace Logic.Translators
{
    public class PostTranslator
    {
        public static PostDto ToPostDto(Post post)
        {
            if (post == null)
                return null;

            return new PostDto
            {
                Id = post.Id,
                Content = post.Content,
                EventId = post.EventId,
                CreatorId = post.CreatorId,
                Created = post.Created
            };
        }
    }
}
