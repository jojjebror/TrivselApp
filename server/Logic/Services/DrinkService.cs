using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class DrinkService
    {
        private readonly DatabaseContext _context;


        public DrinkService(DatabaseContext context)
        {
            _context = context;
        }


        public async Task<ICollection<DrinkForListDto>> GetDrinks()
        {
            var dbDrinks = await _context.Drinks.ToListAsync();
            return dbDrinks.Select(DrinkForListTranslator.ToModel).ToList();
        }

        public async Task<DrinkForListDto> GetDrink(int id)
        {
            var dbDrink = await _context.Drinks
                 .FirstOrDefaultAsync(e => e.Id == id);
            var dr = DrinkForListTranslator.ToModel(dbDrink);

            return dr;

        }

        public async Task<DrinkForListDto> Create(DrinkForListDto drink)
        {
            var dr = new Drink()
            {
                ProductNameBold = drink.ProductNameBold,
                Category = drink.Category,
                AlcoholPercentage = drink.AlcoholPercentage,
                Volume = drink.Volume,
                Price = drink.Price,
                Usage = drink.Usage,
                Taste = drink.Taste,
                BeverageDescriptionShort = drink.BeverageDescriptionShort
                
            };

            _context.Drinks.Add(dr);
            await _context.SaveChangesAsync();

            return DrinkForListTranslator.ToModel(dr);
        }

        //public async Task<DrinkForListDto> DeleteDrink(DrinkForListDto drink, int id)
        //{
        //    var result = await _context.Drinks.FirstOrDefaultAsync(e => e.Id == id);

        //    _context.Drinks.Remove(result);



        //    await _context.SaveChangesAsync();

        //    return drink;
        //}
    }
}
