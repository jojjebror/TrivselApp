using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class PodcastEpisodeDto
    {
        public string Id { get; set; }
        public string Title { get; set; } 
        public string Summary { get; set; }
        public string ImageUrl { get; set; }
        public string EpisodeUrl { get; set; }
        public DateTime Published { get; set; }
    }
}
