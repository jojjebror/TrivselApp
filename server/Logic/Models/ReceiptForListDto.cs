using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class ReceiptForListDto :  BaseDto
    {
        
        public string Image { get; set; }
        public DateTime Date { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; }
        
    }
}
