using Google.Apis.Calendar.v3.Data;
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
        private readonly CloudinaryService _cloudinaryService;


        public DrinkService(DatabaseContext context)
        {
            _context = context;
            _cloudinaryService = new CloudinaryService();
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



        public async Task<int> DeleteDrink(int id)
        {
            var dbDrink = await _context.Drinks.FirstOrDefaultAsync(e => e.Id == id);

            _context.Drinks.Remove(dbDrink);
            await _context.SaveChangesAsync();


            //Deletes the uploaded image
            _cloudinaryService.DeleteImage(dbDrink.ImageId);

            return id;
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

        public async Task<DrinkForListDto> UploadDrinkImage(int id, IFormFile image)
        {
            var dbDrink = await _context.Drinks.FindAsync(id);

            var uploadResult = _cloudinaryService.UploadDrinkImage(dbDrink.ImageId, image);

            dbDrink.Image = uploadResult.Uri.ToString();
            dbDrink.ImageId = uploadResult.PublicId;

            await _context.SaveChangesAsync();

            return DrinkForListTranslator.ToModel(dbDrink);
        }


    }
}
