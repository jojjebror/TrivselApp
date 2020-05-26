using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class DrinkForUpdateDto : BaseDto
    {
       
        
            public string ProductNameBold { get; set; }
            public string Category { get; set; }
            public int Volume { get; set; }
            public int Price { get; set; }
            public string Image { get; set; }

            public string Taste { get; set; }

    }
}
