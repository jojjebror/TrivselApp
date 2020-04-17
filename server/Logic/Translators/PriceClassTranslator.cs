using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class PriceClassTranslator
    {

        public static PriceClassDto ToModel(PriceClass pc)
        {
            if (pc == null)
                return null;


                return new PriceClassDto
                {
                    Id = pc.Id,
                    Name = pc.Name,
                    Price = pc.Price
                };
        }
    }
}
