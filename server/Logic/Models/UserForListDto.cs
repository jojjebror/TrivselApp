﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class UserForListDto : BaseDto
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public int Credit { get; set; }

        public bool Admin { get; set; }

        public string Office { get; set; }

        public string Status { get; set; }      

        public ICollection<UserEventsDto> Events { get; set; }
    }
}


