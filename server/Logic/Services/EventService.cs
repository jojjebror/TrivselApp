using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
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
                EndDate = new DateTime(ev.EndDate.Year, 
                    ev.EndDate.Month, ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId
            };

            _context.Events.Add(newEvent);

            if (ev.Users != null) 
            {
                foreach(var user in ev.Users)
                {
                    var newEventParticipant = new EventParticipant()
                    {
                        EventId = ev.Id,
                        UserId = user.Id
                    };
                    _context.EventParticipants.Add(newEventParticipant);
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
            dbEvent.StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month, ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0);
            dbEvent.EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0);

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


        public async Task<EventParticipant> GetInvitation(int id, int userId)
        {
            return await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == id && ep.UserId == userId);
        }

        public async Task<EventParticipant> CreateInvite(int id, int userId)
        {
            var ep = new EventParticipant
            {
                EventId = id,
                UserId = userId,
                Accepted = true
            };

            _context.EventParticipants.Add(ep);
            await _context.SaveChangesAsync();

            return ep;
        }
    }
}

