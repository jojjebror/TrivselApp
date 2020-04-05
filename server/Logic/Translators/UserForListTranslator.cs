using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class UserForListTranslator
    {
        public static UserForListDto ToModel(User user)
        {
            if (user == null)
                return null;

            return new UserForListDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Office = user.Office,
                Events = user.EventParticipants.Select(e =>
                    new EventForListDto
                    {
                        Id = e.Event.Id,
                        Title = e.Event.Title,
                        Location = e.Event.Location,
                        Description = e.Event.Description,
                        StartDate = e.Event.StartDate,
                        EndDate = e.Event.EndDate,
                        Image = e.Event.Image,
                        CreatorId = e.Event.CreatorId,
                        Accepted = e.Accepted,
                        Name = e.User.Name
                    }).ToList()
            };
        }
    }
}
