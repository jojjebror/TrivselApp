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
    public class EventService
    {
        private readonly DatabaseContext _context;
        private readonly GoogleCalendarService _googleCalendarService;

        public EventService(DatabaseContext context)
        {
            _context = context;
            _googleCalendarService = new GoogleCalendarService(context);
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == id);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.Include(e => e.Creator).ToListAsync();

            return dbEvents.Select(EventForListTranslator.ToModel).ToList();
        }

        public async Task<EventForCreateDto> CreateEvent(EventForCreateDto ev)
        {
            var newEvent = new Database.Entities.Event()
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

            var eventParticipants = new List<EventParticipant>();
            eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = ev.CreatorId, Status = "accepted" });

            if (ev.Offices.Any())
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(o => (o.Office == office && o.Id != ev.CreatorId)).ToListAsync();
                    eventParticipants.AddRange(usersToAdd.Select(u =>
                        new EventParticipant { EventId = ev.Id, UserId = u.Id }).ToList());
                }
            }

            if (ev.Users != null)
            {
                foreach (var user in ev.Users)
                {
                    if (!eventParticipants.Exists(ep => (ep.EventId == ev.Id && ep.UserId == user.Id)))
                    {
                        eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = user.Id });
                    }
                }
            }

            _context.EventParticipants.AddRange(eventParticipants);

            //Create a google calendar event and returns Google Event Id
            var googleEventId = _googleCalendarService.CreateGoogleCalendarEvent(ev, eventParticipants);
            newEvent.GoogleEventId = googleEventId;

            await _context.SaveChangesAsync();

            return EventForCreateTranslator.ToModel(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events.FindAsync(id);

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
            var dbEvent = await _context.Events.FindAsync(id);

            var folderName = Path.Combine("assets", "images", "event-images");
            var imageFolderPath = Path.GetFullPath(folderName).Replace("server\\Api", "app\\src");

            //Deletes all images with the id
            DeleteImageFiles(id, imageFolderPath);

            _googleCalendarService.DeleteGoogleCalendarEvent(dbEvent.GoogleEventId);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            return id;
        }

        public async Task<EventForDetailedDto> AddEventParticipantStatus(int eventId, int userId, string answer)
        {
            //Check if participant already exist and has answered to the event
            var eventParticipant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            //Update participants answer if already answered
            if (eventParticipant != null)
            {
                eventParticipant.Status = answer;
            } 
            else
            {
                //Add participants answer to db if not answered earlier
                var newEp = new EventParticipant
                {
                    EventId = eventId,
                    UserId = userId,
                    Status = answer
                };

                _context.EventParticipants.Add(newEp);
            }

            await _context.SaveChangesAsync();

            //Update the participants status for the google calendar event
            var updatedEp = await _context.EventParticipants.Include(u => u.User).Include(e => e.Event)
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            if (updatedEp.Event.GoogleEventId != null)
            {
                _googleCalendarService.UpdateGoogleCalendarEventParticipantStatus(updatedEp);
            }
                
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
            .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> UpdateParticipantStatus(int eventId, int userId, string answer)
        {
            var participant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            participant.Status = answer;

            await _context.SaveChangesAsync();

            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventForUserListTranslator.ToModel).ToList();

        }

        public async Task<EventForCreateDto> SaveImage(int id, IFormFile image)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            if (image.Length > 0)
            {
                var folderName = Path.Combine("assets", "images", "event-images");
                var pathToSave = Path.GetFullPath(folderName).Replace("server\\Api", "app\\src");

                var fileName = id.ToString() + Path.GetExtension(image.FileName);
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                DeleteImageFiles(id, pathToSave);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                dbEvent.Image = dbPath;

                await _context.SaveChangesAsync();
            }

            return EventForCreateTranslator.ToModel(dbEvent);
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

        public async Task<ICollection<EventForUserListDto>> GetCurrentUserEvents(int userId)
        {
            // old one, keep.... var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();
            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventForUserListTranslator.ToModel).ToList();
        }
    }
}

