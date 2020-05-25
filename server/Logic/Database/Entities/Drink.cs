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
        public string Category { get; set; }
        public int Volume { get; set; }
        public int Price { get; set; }
        public string Taste { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }
    }
}
