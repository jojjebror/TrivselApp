using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;
        private readonly GoogleCalendarService _googleCalendarService;
        private readonly CloudinaryService _cloudinaryService;

        public EventService(DatabaseContext context)
        {
            _context = context;
            _googleCalendarService = new GoogleCalendarService();
            _cloudinaryService = new CloudinaryService();
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == id);

            return EventTranslator.ToEventForDetailedDto(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.Include(e => e.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForListDto).ToList();
        }

        public async Task<EventForCreateDto> CreateEvent(EventForCreateDto ev)
        {
            var newEvent = new Event()
            {
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                    ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0),
                EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month,
                    ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId
            };

            _context.Events.Add(newEvent);

            var eventParticipants = new List<EventParticipant>() { new EventParticipant 
                { EventId = ev.Id, UserId = ev.CreatorId, Status = "accepted" } };

            if (ev.Offices.First() != "")
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(u => u.Office == office && u.Id != ev.CreatorId).ToListAsync();

                    eventParticipants.AddRange(usersToAdd.Select(u =>
                        new EventParticipant { EventId = ev.Id, UserId = u.Id }).ToList());
                }
            }

            if (ev.Users != null)
            {
                foreach (var user in ev.Users)
                {
                    if (!eventParticipants.Exists(ep => ep.EventId == ev.Id && ep.UserId == user.Id))
                    {
                        eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = user.Id });
                    }
                }
            }

            _context.EventParticipants.AddRange(eventParticipants);

            await _context.SaveChangesAsync();
            
            var attendees = await _context.EventParticipants.Include(ep => ep.User)
                .Where(u => u.EventId == newEvent.Id).Select(u => u.User).ToListAsync();

            //Create a google calendar event and returns Google Event Id
            var googleEventId = _googleCalendarService.CreateGoogleEvent(newEvent, attendees);
            newEvent.GoogleEventId = googleEventId;

            await _context.SaveChangesAsync();

            return EventTranslator.ToEventForCreateDto(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            dbEvent.Title = ev.Title;
            dbEvent.Location = ev.Location;
            dbEvent.Description = ev.Description;
            dbEvent.StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0);
            dbEvent.EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, 
                ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0);

            await _context.SaveChangesAsync();

            _googleCalendarService.UpdateGoogleEvent(dbEvent);

            return EventTranslator.ToEventForUpdateDto(dbEvent);
        }

        public async Task<int> DeleteEvent(int id)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            //Deletes the uploaded image
            _cloudinaryService.DeleteImage(dbEvent.ImageId);

            //Deletes the event in google calendar
            _googleCalendarService.DeleteGoogleEvent(dbEvent.GoogleEventId);

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
            
            _googleCalendarService.UpdateGoogleEventParticipantStatus(updatedEp);

            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventTranslator.ToEventForDetailedDto(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> UpdateParticipantStatus(int eventId, int userId, string answer)
        {
            var participant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            participant.Status = answer;

            await _context.SaveChangesAsync();

            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForUserListDto).ToList();

        }

        public async Task<EventForCreateDto> UploadImage(int id, IFormFile image)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            var uploadResult = _cloudinaryService.UploadImage(dbEvent.ImageId, image);

            dbEvent.Image = uploadResult.Uri.ToString();
            dbEvent.ImageId = uploadResult.PublicId;

            await _context.SaveChangesAsync();

            return EventTranslator.ToEventForCreateDto(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> GetCurrentUserEvents(int userId)
        {
            // old one, keep.... var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();
            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForUserListDto).ToList();
        }
    }
}

