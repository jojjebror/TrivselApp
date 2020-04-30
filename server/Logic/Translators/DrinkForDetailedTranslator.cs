using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    class DrinkForDetailedTranslator
    {
        public static DrinkForDetailedDto ToModel(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForDetailedDto
            {
                ProductNameBold = dr.ProductNameBold,
                Category = dr.Category,
                Volume = dr.Volume,
                Price = dr.Price,
                Taste = dr.Taste,
                Usage = dr.Usage,
                AlcoholPercentage = dr.AlcoholPercentage,
                BeverageDescriptionShort = dr.BeverageDescriptionShort,
                Image = dr.Image
            };
        }
    }
}
