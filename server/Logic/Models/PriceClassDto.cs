using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class PriceClassDto : BaseDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
    }
}
