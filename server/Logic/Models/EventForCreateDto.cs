﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class EventForCreateDto : BaseDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreatorId { get; set; }
        public ICollection<UserDto> Users { get; set; }
        public ICollection<OfficeDto> Offices { get; set; }
    }
}