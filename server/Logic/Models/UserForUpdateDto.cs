using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class UserForUpdateDto : BaseDto
    {

        public string Email { get; set; }
        public string Name { get; set; }
        public int Credit { get; set; }

    }
}
