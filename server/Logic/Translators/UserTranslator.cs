using Logic.Database.Entities;
using Logic.Models;
using System.Linq;

namespace Logic.Translators
{
    public class UserTranslator
    {

        public static UserDto ToModel(User user)
        {
            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Credit = user.Credit,
                Email = user.Email,
                Office = user.Office
            };
        }

        public static UserForListDto ToUserForListDto(User user)
        {
            if (user == null)
                return null;

            return new UserForListDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Credit = user.Credit,
                Office = user.Office,
                Events = user.EventParticipants.Select(e =>
                    new UserEventsDto
                    {
                        Id = e.Event.Id,
                        Title = e.Event.Title,
                        Location = e.Event.Location,
                        Description = e.Event.Description,
                        StartDate = e.Event.StartDate,
                        EndDate = e.Event.EndDate,
                        Image = e.Event.Image,
                        CreatorId = e.Event.CreatorId,
                        Status = e.Status,
                        Name = e.User.Name
                    }).ToList()
            };
        }

        public static UserForUpdateDto ToUserForUpdateDto(User user)
        {
            if (user == null)
                return null;

            return new UserForUpdateDto
            {
                Id = user.Id,
                Name = user.Name,
                Credit = user.Credit,
                Email = user.Email
            };
        }
    }
}
