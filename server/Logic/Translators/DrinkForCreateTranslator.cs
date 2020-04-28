using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    class DrinkForCreateTranslator
    {

        public static DrinkForCreateDto ToModel(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForCreateDto
            {
                Id = dr.Id,
                ProductNameBold = dr.ProductNameBold,
                Usage = dr.Usage,
                Price = dr.Price,
                Category = dr.Category,
                Image = dr.Image,
                AlcoholPercentage = dr.AlcoholPercentage,
                BeverageDescriptionShort = dr.BeverageDescriptionShort,
                Taste = dr.Taste,
                Volume = dr.Volume
            };
        }
    }
}
