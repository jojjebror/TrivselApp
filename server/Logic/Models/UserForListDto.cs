using System;
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

        public string Office { get; set; }
    }
}


