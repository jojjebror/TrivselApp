using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
   public class officesForListDto: BaseDto
    {
        public string Name { get; set; }
        public string Adress { get; set; }
        public string SwishNumber { get; set; }
        public string Info { get; set; }
    }
}
