using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class PriceDto : BaseDto
    {
        public string Name { get; set; }
        public int Cost { get; set; }

        public string Category { get; set; }
    }
}
