using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    class DrinkForDetailedDto : BaseDto
    {
        public string ProductNameBold { get; set; }
        public string Category { get; set; }
        public string AlcoholPercentage { get; set; }
        public string Volume { get; set; }
        public string Price { get; set; }
        public string Usage { get; set; }
        public string Taste { get; set; }
        public string BeverageDescriptionShort { get; set; }
    }
}
