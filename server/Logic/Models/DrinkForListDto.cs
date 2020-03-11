using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
   public class DrinkForListDto : BaseDto
    {
        public string ProductNameBold { get; set; }
        public string Category { get; set; }
        public double AlcoholPercentage { get; set; }
        public double Volume { get; set; }
        public double Price { get; set; }
        public string Usage { get; set; }
        public string Taste { get; set; }
        public string BeverageDescriptionShort { get; set; }
    }
}
