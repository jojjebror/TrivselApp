using Logic.Database;
using Logic.Models;
using Logic.Translators;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
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
    }
}
