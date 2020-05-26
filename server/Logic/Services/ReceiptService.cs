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
using System.Text;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class ReceiptService
    {
        private readonly DatabaseContext _context;
        private readonly CloudinaryService _cloudinaryService;


        public ReceiptService(DatabaseContext context)
        {

            _context = context;
            _cloudinaryService = new CloudinaryService();

        }


        public async Task<ICollection<ReceiptForListDto>> GetReceipt()
        {
            var dbDrinks = await _context.Receipts.Include(x => x.Creator).OrderByDescending(i => i.Id).ToListAsync();

            return dbDrinks.Select(ReceiptTranslator.ToReceiptForListDto).ToList();
        }

        public async Task<ICollection<ReceiptForListDto>> GetCurrentUserReceipts(int userId)
        {
            var dbReceipts = await _context.Receipts.Include(x => x.Creator).Where(i => i.CreatorId == userId).ToListAsync();
            return dbReceipts.Select(ReceiptTranslator.ToReceiptForListDto).ToList();

        }

        public async Task<ReceiptForCreateDto> CreateReceipt(ReceiptForCreateDto receipt)
        {

                var re = new Receipt()
                {
                    Image = receipt.Image,
                    Date = DateTime.Now,
                    CreatorId = receipt.CreatorId
                };

                _context.Receipts.Add(re);
                await _context.SaveChangesAsync();
                return ReceiptTranslator.ToReceiptForCreateDto(re);
       

        }


        public async Task<int> DeleteReceipt(int id)
        {
            var dbReceipt = await _context.Receipts.FirstOrDefaultAsync(e => e.Id == id);

            _context.Receipts.Remove(dbReceipt);
            await _context.SaveChangesAsync();

            //Deletes the uploaded image
            _cloudinaryService.DeleteImage(dbReceipt.ImageId);

            return id;

        }

        public bool ValidateImage(string fileName)
        {

            string ext = Path.GetExtension(fileName);
            switch (ext.ToLower())
            {
                case ".gif":
                    {
                        return true;
                    }
     
                case ".jpg":
                    {
                        return true;
                    }
                   
                case ".jpeg":
                    {
                        return true;
                    }
                 
                case ".png":
                    {
                        return true;
                    }
                default:
                    {
                        return false;
                    }  
            }

        }

    


        public async Task<ReceiptForCreateDto> UploadImage(int id, IFormFile image)
        {
            var dbReceipt = await _context.Receipts.FindAsync(id);

            var uploadResult = await _cloudinaryService.UploadImage(image, "receipt-images", dbReceipt.ImageId);

            dbReceipt.Image = uploadResult.Uri.ToString();
            dbReceipt.ImageId = uploadResult.PublicId;

            await _context.SaveChangesAsync();

            return ReceiptTranslator.ToReceiptForCreateDto(dbReceipt);
        }

      
    }
}
