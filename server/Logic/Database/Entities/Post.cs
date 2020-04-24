using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class Post : BaseEntity
    {
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int CreatorId { get; set; }
        public int EventId { get; set; }
        public User Creator { get; set; }
        public Event Event { get; set; }
    }
}
