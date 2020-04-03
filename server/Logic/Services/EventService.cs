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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;

        public EventService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants
                .Select(u => u.User)).FirstOrDefaultAsync(e => e.Id == id);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.ToListAsync();

            return dbEvents.Select(EventForListTranslator.ToModel).ToList();
        }

        public async Task<EventForCreateDto> CreateEvent(EventForCreateDto ev)
        {

            var newEvent = new Event()
            {
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                Image = ev.Image,
                StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                    ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0),
                EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month,
                    ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId
            };

            _context.Events.Add(newEvent);

            var CheckIfUserIsAddedInOffice = new List<EventParticipant>();

            if (ev.Offices != null)
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(o => o.Office == office).ToListAsync();

                    foreach (var user in usersToAdd)
                    {

                        var newEventParticipant = new EventParticipant()
                        {
                            EventId = ev.Id,
                            UserId = user.Id
                        };

                        CheckIfUserIsAddedInOffice.Add(newEventParticipant);
                        _context.EventParticipants.Add(newEventParticipant);
                    }
                }
            }

            if (ev.Users != null)
            {
                foreach (var user in ev.Users)
                {
                    var newEventParticipant = new EventParticipant()
                    {
                        EventId = ev.Id,
                        UserId = user.Id
                    };

                    if (!CheckIfUserIsAddedInOffice.Exists(x => x.UserId == newEventParticipant.UserId))
                    {
                        _context.EventParticipants.Add(newEventParticipant);
                    }
                }
            }

            await _context.SaveChangesAsync();

            return EventForCreateTranslator.ToModel(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id);

            dbEvent.Title = ev.Title;
            dbEvent.Location = ev.Location;
            dbEvent.Description = ev.Description;
            dbEvent.Image = ev.Image;
            dbEvent.StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0);
            dbEvent.EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, 
                ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0);

            await _context.SaveChangesAsync();

            return EventForUpdateTranslator.ToModel(dbEvent);
        }

        public async Task<int> DeleteEvent(int id)
        {
            var dbEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            return id;
        }


        public async Task<EventParticipant> CheckInvitation(int id, int userId)
        {
            return await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == id && ep.UserId == userId);
        }


        public async Task<EventForDetailedDto> AddEventParticipant(int id, int userId)
        {
            var ep = new EventParticipant
            {
                EventId = id,
                UserId = userId,
                Accepted = true
            };

            _context.EventParticipants.Add(ep);
            await _context.SaveChangesAsync();

            var dbEvent = await _context.Events.Include(e => e.EventParticipants
               .Select(u => u.User)).FirstOrDefaultAsync(e => e.Id == id);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<bool> SaveImage(int id, IFormFile image)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            pathToSave = pathToSave.Replace("Api", "Logic");
            var folderName2 = Path.Combine("images", "event-images");
            var pathToSave2 = "C:\\Users\\andre\\TrivselAppV2\\app\\src\\assets\\images\\event-images";
            //var pathToSave2 = "C:\\Users\\andre\\TrivselAppV2\\server\\Logic\\Resources\\Images";

            if (image.Length > 0)
            {
                //var fileName = id.ToString() + "." + ContentDispositionHeaderValue
                //    .Parse(image.ContentDisposition).FileName.Trim('"').Split('.').Last();
                var fileName = id.ToString() + Path.GetExtension(image.FileName);
                var fullPath = Path.Combine(pathToSave2, fileName);
                var dbPath = Path.Combine(folderName2, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                _context.Events.Find(id).Image = dbPath;
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<string> GetImage(int id)
        {
            var dbEvent = await _context.Events.FindAsync(id);
            var imagePath = dbEvent.Image;
            var fullPath = Path.GetFullPath(imagePath);
            var fullPath2 = Path.GetFullPath(imagePath);
            fullPath = fullPath.Replace("Api", "Logic");

            return fullPath2;
        }

        //public async Task<HttpResponseMessage> GetImage(int id)
        //{
        //    var dbEvent = await _context.Events.FindAsync(id);
        //    var imagePath = dbEvent.Image;
        //    var fullPath = Path.GetFullPath(imagePath);
        //    fullPath = fullPath.Replace("Api", "Logic");

        //    using (var fs = new FileStream(fullPath, FileMode.Open))
        //    {
        //        HttpResponseMessage response = new HttpResponseMessage();
        //        response.Content = new StreamContent(fs);
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
        //        return response;
        //    }
        //}
    }
}

