using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class PriceForListTranslator
    {

        public static PriceDto ToModel(Price pc)
        {
            if (pc == null)
                return null;


                return new PriceDto
                {
                    Id = pc.Id,
                    Name = pc.Name,
                    Cost = pc.Cost
                };
        }
    }
}
