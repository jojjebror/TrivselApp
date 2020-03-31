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
                Office = user.Office
            };
        }
    }
}
