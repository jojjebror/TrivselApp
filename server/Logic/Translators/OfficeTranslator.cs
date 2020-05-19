using Logic.Database.Entities;
using Logic.Models;

namespace Logic.Translators
{
    public class OfficeTranslator
    {
        public static OfficeDto ToOfficeDto(Office office)
        {
            if (office == null)
                return null;

            return new OfficeDto
            {
                Id = office.Id,
                Name = office.Name,
                Adress = office.Adress,
                SwishNumber = office.SwishNumber,
                Info = office.Info
            };
        }
    }
}
