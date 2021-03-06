﻿using System;

namespace Logic.Models
{
    public class PodcastEpisodeDto : BaseDto
    {
        public string EpisodeId { get; set; }
        public string Title { get; set; } 
        public string Summary { get; set; }
        public string ImageUrl { get; set; }
        public string EpisodeUrl { get; set; }
        public DateTime Published { get; set; }
    }
}
