using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class EventForUpdateTranslator
    {
        public static EventForUpdateDto ToModel(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForUpdateDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description, 
                Location = ev.Location,
                Image = ev.Image,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                //CreatorId = ev.CreatorId
            };
        }
    }
}
