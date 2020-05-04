using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class ReceiptForListTranslator
    {

        public static ReceiptForListDto ToModel(Receipt re)
        {
            if (re == null)
                return null;

            return new ReceiptForListDto
            {
                Id = re.Id,
                Image = re.Image,
                Date = DateTime.Now
            };
        }
    }
}
