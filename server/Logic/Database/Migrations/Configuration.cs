namespace Logic.Database.Migrations
{
    using Logic.Database.Entities;
    using Logic.Models;
    using Logic.Services;
    using Microsoft.AspNet.Identity;
    using System.Data.Entity.Migrations;
    using System.Threading.Tasks;

    internal sealed class Configuration : DbMigrationsConfiguration<DatabaseContext>
    {

        private readonly PasswordHasher _passwordHasher = new PasswordHasher();

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Database\Migrations";
        }

        protected override void Seed(DatabaseContext context)
        {
            var testUser = new User()
            {
                Id = 1,
                Email = "test@test.se",
                Name = "Test Persson",
                Password = _passwordHasher.HashPassword("test")
            };

            context.Users.AddOrUpdate(testUser);

            context.SaveChanges();
        }
    }
}
