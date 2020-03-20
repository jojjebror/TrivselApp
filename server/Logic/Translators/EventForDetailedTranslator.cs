using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class EventForDetailedTranslator
    {
        public static EventForDetailedDto ToModel(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForDetailedDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                Image = ev.Image,
                Location = ev.Location,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                CreatorId = ev.CreatorId,
                Users = new List<UserDto>
                {
                    new UserDto {

                    Id = ev.EventParticipants.FirstOrDefault().User.Id,
                    Email = ev.EventParticipants.FirstOrDefault().User.Email,
                    Name = ev.EventParticipants.FirstOrDefault().User.Name
                    }
                }
            };
        }
    }
}

//new UserDto
//{
//    //Id = ev.EventParticipants.FirstOrDefault().User.Id,
//    //Email = ev.EventParticipants.FirstOrDefault().User.Email,
//    //Name = ev.EventParticipants.FirstOrDefault().User.Name

//    Id = ev.EventParticipants.FirstOrDefault().User.Id,
//    Email = ev.EventParticipants.FirstOrDefault().User.Email,
//    Name = ev.EventParticipants.FirstOrDefault().User.Name

//}


//ev.EventParticipants.ToList().ForEach(u =>
//                    {
//    new UserDto
//    {
//        Id = u.User.Id,
//        Email = u.User.Email,
//        Name = u.User.Name
//    }
//                    })