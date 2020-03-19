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
            var dbEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id);

            var ev = EventForDetailedTranslator.ToModel(dbEvent);

            return ev;
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.ToListAsync();

            return dbEvents.Select(EventForListTranslator.ToModel).ToList();
        }

        public async Task<EventForCreateDto> Create(EventForCreateDto ev)
        {

            var newEvent = new Event()
            {
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                Image = ev.Image,
                StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month, ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0),
                EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId,
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return EventForCreateTranslator.ToModel(newEvent);
        }

        public async Task<EventForUpdateDto> Update(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id);

            dbEvent.Title = ev.Title;
            dbEvent.Location = ev.Location;
            dbEvent.Description = ev.Description;

            await _context.SaveChangesAsync();

            return EventForUpdateTranslator.ToModel(dbEvent);
        }

    }
}

