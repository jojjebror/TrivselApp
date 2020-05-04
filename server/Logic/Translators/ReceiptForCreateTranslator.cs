using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class ReceiptForCreateTranslator
    {

        public static ReceiptForListDto ToModel(Receipt ev)
        {
            if (ev == null)
                return null;

            return new ReceiptForListDto
            {
                Image = ev.Image,
                Date = DateTime.Now
            };
        }
    }
            
}
