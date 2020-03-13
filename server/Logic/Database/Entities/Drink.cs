using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class Drink : BaseEntity
    {
        public string ProductNameBold { get; set; }
        public string ProductId { get; set; }
        public string Category { get; set; }
        public string AlcoholPercentage { get; set; }
        public string Volume { get; set; }
        public string Price { get; set; }
        public string Usage { get; set; }
        public string Taste { get; set; }
        public string BeverageDescriptionShort { get; set; }
    }
}
