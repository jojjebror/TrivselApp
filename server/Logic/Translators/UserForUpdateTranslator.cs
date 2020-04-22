﻿using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    class UserForUpdateTranslator
    {
        public static UserForUpdateDto ToModel(User user)
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