namespace Logic.Database.Migrations
{
    using Logic.Database.Entities;
    using Logic.Models;
    using Logic.Services;
    using Microsoft.AspNet.Identity;
    using System;
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

            var testUser1 = new User()
            {
                Id = 2,
                Email = "jerker@test.se",
                Name = "Jerker Persson",
                Password = _passwordHasher.HashPassword("test")
            };

            var testEvent1 = new Event()
            {
                Id = 1,
                Title = "AW-fredag",
                Description = "Nu ska vi ha kul",
                Image = "test",
                Location = "Art bar",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 1
            };

            var testEvent2 = new Event()
            {
                Id = 2,
                Title = "AW-torsdag",
                Description = "Nu ska vi ha j�ttekul",
                Image = "test",
                Location = "Lion Bar",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 1
            };

            var testEvent3 = new Event()
            {
                Id = 3,
                Title = "Paintball",
                Description = "Nu ska vi ha superkul",
                Image = "test",
                Location = "Trollskogen",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 1
            };
            var testDrink = new Drink()
            {
                Id = 1,
                ProductNameBold = "Carlsberg Hof",
                Category = "�l",
                AlcoholPercentage = "4.2%",
                Volume = "50cl",
                Price = "16kr",
                Taste = "Standard ljus �l, r�tt svag",
                Usage = "Gott till grillat",
                BeverageDescriptionShort = "Klen smak",
            };

            var testEp = new EventParticipant()
            {
                Id = 1,
                UserId = 1,
                EventId = 3,
                Accepted = true
            };

            var testEp1 = new EventParticipant()
            {
                Id = 2,
                UserId = 2,
                EventId = 3
            };

            var testEp2 = new EventParticipant()
            {
                Id = 3,
                UserId = 1,
                EventId = 1,
                Accepted = true
            };


            context.Users.AddOrUpdate(testUser);
            context.Users.AddOrUpdate(testUser1);

            context.Events.AddOrUpdate(testEvent1);
            context.Events.AddOrUpdate(testEvent2);
            context.Events.AddOrUpdate(testEvent3);

            context.EventParticipants.AddOrUpdate(testEp);
            context.EventParticipants.AddOrUpdate(testEp1);
            context.EventParticipants.AddOrUpdate(testEp2);



            context.Drinks.AddOrUpdate(testDrink);


            context.SaveChanges();
        }
    }
}
