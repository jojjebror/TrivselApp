using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
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


        public async Task<ICollection<DrinkForListDto>> FilterDrink(string category)
        {

            if (category == "Öl")
            {

                var filter = await _context.Drinks.Where(d => d.Category == "Öl").ToListAsync();
                var add = filter.Select(DrinkForListTranslator.ToModel).ToList();
                return add;

            }
            if (category == "Vin")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Vin").ToListAsync();
                var add = filter.Select(DrinkForListTranslator.ToModel).ToList();
                return add;
            }

            if (category == "Cider")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Cider").ToListAsync();
                var add = filter.Select(DrinkForListTranslator.ToModel).ToList();
                return add;

            }

            if (category == "Kategori")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Kategori").ToListAsync();
                var add = filter.Select(DrinkForListTranslator.ToModel).ToList();
                return add;

            }

            return httpBadRequest();

        }

        private ICollection<DrinkForListDto> httpBadRequest()
        {
            throw new NotImplementedException();
        }

        public async Task<DrinkForListDto> GetDrink(int id)
        {
            var dbDrink = await _context.Drinks
                 .FirstOrDefaultAsync(e => e.Id == id);
            var dr = DrinkForListTranslator.ToModel(dbDrink);

            return dr;

        }

        //public async Task <ICollection<DrinkForListDto>> FilterDrinks()
        //{

        //    var filter = await _context.Drinks.Where(d => d.Category == "Vin").ToListAsync();

        //    if (filter != null)
        //    {
        //        return filter.Select(DrinkForListTranslator.ToModel).ToList();
        //    }


        //    return null;
        //}


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
                BeverageDescriptionShort = drink.BeverageDescriptionShort,
                Image = drink.Image

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
            var dbDrink = await _context.Drinks
                .FirstOrDefaultAsync(e => e.Id == id);

            dbDrink.ProductNameBold = dr.ProductNameBold;
            dbDrink.Price = dr.Price;
            dbDrink.Volume = dr.Volume;
            dbDrink.Category = dr.Category;
            dbDrink.Image = dr.Image;

            await _context.SaveChangesAsync();

            return DrinkForUpdateTranslator.ToModel(dbDrink);
        }

        public void DeleteImageFiles(int id, string path)
        {
            var files = Directory.GetFiles(path, id.ToString() + ".*");
            if (files.Length > 0)
            {
                foreach (var file in files)
                {
                    File.Delete(file);
                }
            }
        }

        public async Task<DrinkForListDto> SaveImage(int id, IFormFile image)
        {
            var dbDrink = await _context.Drinks.FindAsync(id);

            if (image.Length > 0)
            {
                var folderName = Path.Combine("assets", "images", "drink-images");
                var pathToSave = Path.GetFullPath(folderName).Replace("server\\Api", "app\\src");

                var fileName = id.ToString() + Path.GetExtension(image.FileName);
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                DeleteImageFiles(id, pathToSave);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                dbDrink.Image = dbPath;

                await _context.SaveChangesAsync();
            }

            return DrinkForListTranslator.ToModel(dbDrink);
        }

        public async Task<ICollection<ReceiptForListDto>> GetReceipt()
        {
            var dbDrinks = await _context.Receipts.ToListAsync();
            return dbDrinks.Select(ReceiptForListTranslator.ToModel).ToList();
        }
    }
}
