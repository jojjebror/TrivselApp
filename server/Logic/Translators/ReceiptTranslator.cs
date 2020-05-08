using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class ReceiptTranslator
    {

        public static ReceiptForListDto ToReceiptForListDto(Receipt ev)
        {
            if (ev == null)
                return null;

            return new ReceiptForListDto
            {
                Id = ev.Id,
                Image = ev.Image,
                Date = ev.Date,
                CreatorId = ev.CreatorId,
                CreatorName = ev.Creator.Name
            };
        }

        public static ReceiptForCreateDto ToReceiptForCreateDto(Receipt ev)
        {
            if (ev == null)
                return null;

            return new ReceiptForCreateDto
            {
                Id = ev.Id,
                Image = ev.Image,
                Date = DateTime.Now,
                CreatorId = ev.CreatorId
            };
        }
    }
            
}
