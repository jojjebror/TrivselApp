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

        //Gets all the drink-objects.
        public async Task<ICollection<DrinkForListDto>> GetDrinks()
        {
            var dbDrinks = await _context.Drinks.ToListAsync();
            return dbDrinks.Select(DrinkTranslator.TodrinkForListDto).ToList();
        }

        //Filters the objects in Drink, based on it's category name. 
        public async Task<ICollection<DrinkForListDto>> FilterDrink(string category)
        {

            if (category == "Öl")
            {

                var filter = await _context.Drinks.Where(d => d.Category == "Öl").ToListAsync();
                var add = filter.Select(DrinkTranslator.TodrinkForListDto).ToList();
                return add;

            }
            if (category == "Vin")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Vin").ToListAsync();
                var add = filter.Select(DrinkTranslator.TodrinkForListDto).ToList();
                return add;
            }

            if (category == "Cider")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Cider").ToListAsync();
                var add = filter.Select(DrinkTranslator.TodrinkForListDto).ToList();
                return add;

            }

            if (category == "Kategori")
            {
                var filter = await _context.Drinks.Where(d => d.Category == "Kategori").ToListAsync();
                var add = filter.Select(DrinkTranslator.TodrinkForListDto).ToList();
                return add;

            }

            return httpBadRequest();

        }

        private ICollection<DrinkForListDto> httpBadRequest()
        {
            throw new NotImplementedException();
        }

        //Gets a drink-object based on its id. 
        public async Task<DrinkForListDto> GetDrink(int id)
        {
            var dbDrink = await _context.Drinks
                 .FirstOrDefaultAsync(e => e.Id == id);
            var dr = DrinkTranslator.TodrinkForListDto(dbDrink);

            return dr;

        }
        //Creates a drink object with the listed paramteters below. 
        public async Task<DrinkForListDto> Create(DrinkForListDto drink)
        {
            var dr = new Drink()
            {
                ProductNameBold = drink.ProductNameBold,
                Category = drink.Category,
                Volume = drink.Volume,
                Price = drink.Price,
                Taste = drink.Taste,
                Image = drink.Image

            };

            _context.Drinks.Add(dr);
            await _context.SaveChangesAsync();

            return DrinkTranslator.TodrinkForListDto(dr);
        }


        //Deletes a specified drink-object based on its id. 
        public async Task<int> DeleteDrink(int id)
        {
            var dbDrink = await _context.Drinks.FirstOrDefaultAsync(e => e.Id == id);

            _context.Drinks.Remove(dbDrink);
            await _context.SaveChangesAsync();


            //Deletes the uploaded image
            _cloudinaryService.DeleteImage(dbDrink.ImageId);

            return id;
        }

       //Updates a drink-object with same parameters but different values. 
        public async Task<DrinkForUpdateDto> Update(int id, DrinkForUpdateDto dr)
        {
            var dbDrink = await _context.Drinks
                .FirstOrDefaultAsync(e => e.Id == id);

            dbDrink.ProductNameBold = dr.ProductNameBold;
            dbDrink.Price = dr.Price;
            dbDrink.Volume = dr.Volume;
            dbDrink.Category = dr.Category;
            dbDrink.Taste = dr.Taste;
            dbDrink.Image = dr.Image;

            await _context.SaveChangesAsync();

            return DrinkTranslator.ToDrinkForUpdateDto(dbDrink);
        }
        //Image upload.
        public async Task<DrinkForListDto> UploadDrinkImage(int id, IFormFile image)
        {
            var dbDrink = await _context.Drinks.FindAsync(id);

            var uploadResult = await _cloudinaryService.UploadImage(image, "drink-images", dbDrink.ImageId);

            dbDrink.Image = uploadResult.Uri.ToString();
            dbDrink.ImageId = uploadResult.PublicId;

            await _context.SaveChangesAsync();

            return DrinkTranslator.TodrinkForListDto(dbDrink);
        }


    }
}
