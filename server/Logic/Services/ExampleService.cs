using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class ExampleService
    {

        private DatabaseContext _context;

        public ExampleService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ICollection<ExampleDto>> List()
        {
            var res = await _context.Examples.ToListAsync();
            return res.Select(ExampleTranslator.ToModel).ToList();
        }

        public async Task<ExampleDto> Create(ExampleDto example)
        {
            var dbExample = new Example()
            {
                Name = example.Name
            };

            _context.Examples.Add(dbExample);
            await _context.SaveChangesAsync();

            return ExampleTranslator.ToModel(dbExample);
        }

    }
}
