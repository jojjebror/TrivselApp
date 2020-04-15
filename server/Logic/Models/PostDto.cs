using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class PostDto : BaseDto
    {
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int CreatorId { get; set; }
        public int EventId { get; set; }
        public string CreatorName { get; set; }

    }
}
