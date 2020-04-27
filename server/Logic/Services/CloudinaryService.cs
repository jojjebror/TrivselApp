using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;

namespace Logic.Services
{
    public class CloudinaryService
    {
        //trivselapp@gmail.com Exsitec123!

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
        
        public ImageUploadResult UploadImage(IFormFile image)
        {
            var uploadResult = new ImageUploadResult();

            try
            {
                if (image.Length > 0)
                {
                    using (var stream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(image.Name, stream),
                            Folder = "event-images",
                            Transformation = new Transformation().Width(200).Height(200).Crop("fill")                    
                        };

                        uploadResult = _cloudinaryService.Upload(uploadParams);
                    }
                }
            } 
            catch (Exception e)
            {
                e.Message.ToString();
            }
            
            return uploadResult;
        }

        public void DeleteImage(string publicId)
        {
            try
            {
                _cloudinaryService.DeleteResources(publicId);
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }         
        }

        public ImageUploadResult UpdateImage(string publicId, IFormFile image)
        {
            var uploadResult = new ImageUploadResult();

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
                            Transformation = new Transformation().Width(200).Height(200).Crop("fill"),
                            Overwrite = true
                        };

                        uploadResult = _cloudinaryService.Upload(uploadParams);
                    }
                }
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }

            return uploadResult;
        }
    }
}
