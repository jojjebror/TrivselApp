using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class PostForCreateTranslator
    {
        public static PostDto ToModel(Post post)
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
                //CreatorName = post.Creator.Name
            };
        }
    }
}
