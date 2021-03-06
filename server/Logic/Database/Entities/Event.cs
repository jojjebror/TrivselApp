﻿using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class Event : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageId { get; set; }
        public string ImageUrl { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreateDate { get; set; }
        public string GoogleEventId { get; set; }
        public int CreatorId { get; set; }
        public virtual User Creator { get; set; }
        public virtual ICollection<EventParticipant> EventParticipants { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
