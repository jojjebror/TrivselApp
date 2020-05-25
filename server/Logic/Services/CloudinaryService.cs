using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinaryService;

        public CloudinaryService()
        {
            Account account = new Account
            {
                Cloud = "dc3jys6jt",
                ApiKey = "728169768252123",
                ApiSecret = "XCooQ2YHdLYl4frH7i7bYxDq_LU"
            };

            _cloudinaryService = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadImage(IFormFile image, string folder, string publicId = null)
        {
            try
            {
                if (image.Length > 0)
                {
                    using (var stream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            PublicId = publicId,
                            File = new FileDescription(image.Name, stream),
                            Folder = (publicId == null) ? folder : null,
                            Transformation = new Transformation().Width(200).Height(200).Crop("fill"),
                            Overwrite = (publicId == null) ? false : true
                        };

                        var uploadResult = await _cloudinaryService.UploadAsync(uploadParams);

                        return uploadResult;
                    }
                }
            } 
            catch (Exception e)
            {
                e.Message.ToString();
            }
            
            return null;
        }

        public async void DeleteImage(string publicId)
        {
            try
            {
                await _cloudinaryService.DeleteResourcesAsync(publicId);
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }         
        }
    }
}
