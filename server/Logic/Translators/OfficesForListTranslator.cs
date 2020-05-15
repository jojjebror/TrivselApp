using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Logic.Database.Entities;
using Logic.Models;

namespace Logic.Translators
{
    class OfficesForListTranslator
    {
        public static officesForListDto ToModel(Office office)
        {
            if (office == null)
                return null;

            return new officesForListDto
            {
                Id = office.Id,
                Name = office.Name,
                Adress = office.Adress,
                SwishNumber = office.SwishNumber
            };
        }
    }
}
