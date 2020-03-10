using Logic.Database.Entities;
using System.Data.Entity;

namespace Logic.Database
{

    public class DatabaseContext : DbContext
    {
        public DatabaseContext(string connString) : base(connString) { }

        // Sets of database entities
        public DbSet<Example> Examples { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
