﻿
namespace Logic.Models
{
    public class UserDto : BaseDto
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public int Credit { get; set; }

        public bool Admin { get; set; }

        public string Office { get; set; }
    }
}
