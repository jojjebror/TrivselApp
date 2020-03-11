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
    }
}

