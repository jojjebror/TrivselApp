using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class EventForUserListTranslator
    {
        public static EventForUserListDto ToModel(EventParticipant ev)
        {
            if (ev == null)
                return null;

            return new EventForUserListDto
            {
                Id = ev.Event.Id,
                Title = ev.Event.Title,
                Description = ev.Event.Description,
                Image = ev.Event.Image,
                Location = ev.Event.Location,
                StartDate = ev.Event.StartDate,
                EndDate = ev.Event.EndDate,
                CreatorId = ev.Event.CreatorId,
                Status = ev.Status,
                CreatorName = ev.Event.Creator.Name

            };
        }
    }
}

