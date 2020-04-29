using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class Receipt : BaseEntity
    {
        public string Image { get; set; }
        public DateTime Date { get; set; }

    }
}
