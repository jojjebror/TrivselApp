﻿using Logic.Database;
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
            var filter = await _context.Drinks.Where(d => d.Category == "Öl").ToListAsync();
            var filter2 = await _context.Drinks.Where(d => d.Category == "Vin").ToListAsync();
            var filter3 = await _context.Drinks.Where(d => d.Category == "Cider").ToListAsync();
           
            if (filter != null)
            {
                return filter.Select(DrinkForListTranslator.ToModel).ToList();
            }
            

            return null;
        }

        //public async Task<ICollection<DrinkForListDto>> GetDrinks(string category)
        //{
        //    var filter = await _context.Drinks.Where(d => d.Category == category || d.Category == category || d.Category == category ).ToListAsync();

        //    var add = filter.Select(DrinkForListTranslator.ToModel).ToList();

        //    return add;
        //}

        public async Task<DrinkForListDto> GetDrink(int id)
        {
            var dbDrink = await _context.Drinks
                 .FirstOrDefaultAsync(e => e.Id == id);
            var dr = DrinkForListTranslator.ToModel(dbDrink);

            return dr;

        }

        public async Task <ICollection<DrinkForListDto>> FilterDrinks()
        {

            var filter = await _context.Drinks.Where(d => d.Category == "Vin").ToListAsync();

            if (filter != null)
            {
                return filter.Select(DrinkForListTranslator.ToModel).ToList();
            }


            return null;
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

        public async Task<DrinkForListDto> DeleteDrink(int id)
        {
            var result = await _context.Drinks.FirstOrDefaultAsync(e => e.Id == id);

            _context.Drinks.Remove(result);



            await _context.SaveChangesAsync();

            return DrinkForListTranslator.ToModel(result);
        }

        

        public async Task<DrinkForUpdateDto> Update(int id, DrinkForUpdateDto dr)
        {
            var dbEvent = await _context.Drinks
                .FirstOrDefaultAsync(e => e.Id == id);

            dbEvent.ProductNameBold = dr.ProductNameBold;
            dbEvent.Price = dr.Price;
            dbEvent.Volume = dr.Volume;
            dbEvent.Category = dr.Category;

            await _context.SaveChangesAsync();

            return DrinkForUpdateTranslator.ToModel(dbEvent);
        }
    }
}
