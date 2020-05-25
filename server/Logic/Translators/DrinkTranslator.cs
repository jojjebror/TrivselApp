using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    class DrinkTranslator
    {

        public static DrinkForCreateDto ToDrinkForCreateDto(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForCreateDto
            {
                Id = dr.Id,
                ProductNameBold = dr.ProductNameBold,
                Price = dr.Price,
                Category = dr.Category,
                Image = dr.Image,
                Taste = dr.Taste,
                Volume = dr.Volume
            };
        }

        public static DrinkForDetailedDto ToDrinkForDetailedDto(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForDetailedDto
            {
                ProductNameBold = dr.ProductNameBold,
                Category = dr.Category,
                Volume = dr.Volume,
                Taste = dr.Taste,
                Price = dr.Price,
                Image = dr.Image
            };
        }

        public static DrinkForListDto TodrinkForListDto(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForListDto
            {
                Id = dr.Id,
                ProductNameBold = dr.ProductNameBold,
                Category = dr.Category,
                Volume = dr.Volume,
                Taste = dr.Taste,
                Price = dr.Price,
                Image = dr.Image
            };
        }

        public static DrinkForUpdateDto ToDrinkForUpdateDto(Drink dr)
        {
            if (dr == null)
                return null;

            return new DrinkForUpdateDto
            {
                Id = dr.Id,
                ProductNameBold = dr.ProductNameBold,
                Category = dr.Category,
                Volume = dr.Volume,
                Taste = dr.Taste,
                Price = dr.Price,
                Image = dr.Image
            };
        }




    }
}
