using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class ExampleTranslator
    {
        public static ExampleDto ToModel(Example example)
        {
            if (example == null)
                return null;

            return new ExampleDto
            {
                Id = example.Id,
                Name = example.Name
            };
        }
    }
}
