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
        public DbSet<Event> Events { get; set; }
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<EventParticipant> EventParticipants { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}
