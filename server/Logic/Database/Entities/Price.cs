using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class Price : BaseEntity
    {
        public string Name { get; set; }
        public int Cost { get; set; }

        public string Category { get; set; }
        
    }
}
