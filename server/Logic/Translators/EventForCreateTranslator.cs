using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class EventForCreateTranslator
    {
        public static EventForCreateDto ToModel(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForCreateDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                Image = ev.Image,
                Location = ev.Location,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                CreatorId = ev.CreatorId,
                CreateDate = DateTime.Now

            };
        }
    }
}
