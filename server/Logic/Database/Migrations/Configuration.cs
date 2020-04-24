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
                Password = _passwordHasher.HashPassword("test"),
                Office = "Linköping"
            };

            var testUser1 = new User()
            {
                Id = 2,
                Email = "jerker@test.se",
                Name = "Jerker Persson",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Stockholm"
            };

            var testUser2 = new User()
            {
                Id = 3,
                Email = "magnus@test.se",
                Name = "Magnus Svensson",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Uppsala"
            };

            var testUser3 = new User()
            {
                Id = 4,
                Email = "zlatan@test.se",
                Name = "Zlatan Ibrahimovic",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Linköping"
            };

            var testUser4 = new User()
            {
                Id = 5,
                Email = "hanna@test.se",
                Name = "Hanna Fransson",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Örebro"
            };

            var testUser5 = new User()
            {
                Id = 6,
                Email = "philip@test.se",
                Name = "Philip Haglund",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Linköping"
            };

            var testUser6 = new User()
            {
                Id = 7,
                Email = "sanna@test.se",
                Name = "Sanna Kallur",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Malmö"
            };

            var testUser7 = new User()
            {
                Id = 8,
                Email = "martin@test.se",
                Name = "Martin De La Hoya",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Örebro"
            };

            var testUser8 = new User()
            {
                Id = 9,
                Email = "hanna@test.se",
                Name = "Hanna Gustafsson",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Stockholm"
            };


            var testEvent1 = new Event()
            {
                Id = 1,
                Title = "AW-fredag",
                Description = "Nu ska vi ha kul",
                Image = "assets/images/event-images/default_event.png",
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
                Description = "Nu ska vi ha jättekul",
                Image = "assets/images/event-images/default_event.png",
                Location = "Lion Bar",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 2
            };

            var testEvent3 = new Event()
            {
                Id = 3,
                Title = "Paintball",
                Description = "Nu ska vi ha superkul",
                Image = "assets/images/event-images/default_event.png",
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
                Category = "Öl",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 16,
                Taste = "Standard ljus öl, rätt svag",
                Usage = "Gott till grillat",
                BeverageDescriptionShort = "Klen smak",
            };

            var testEp = new EventParticipant()
            {
                Id = 1,
                UserId = 1,
                EventId = 3,
                Status = "accepted"
            };

            var testEp1 = new EventParticipant()
            {
                Id = 2,
                UserId = 2,
                EventId = 3,
                Status = "accepted"
            };

            var testEp2 = new EventParticipant()
            {
                Id = 3,
                UserId = 1,
                EventId = 1,
                Status = "accepted"
            };

            var testEp3 = new EventParticipant()
            {
                Id = 4,
                UserId = 3,
                EventId = 2,
                Status = "accepted"
            };

            var testEp4 = new EventParticipant()
            {
                Id = 5,
                UserId = 4,
                EventId = 1,
                Status = "accepted"
            };

            var testEp5 = new EventParticipant()
            {
                Id = 6,
                UserId = 5,
                EventId = 3,
                Status = "accepted"
            };

            var testEp6 = new EventParticipant()
            {
                Id = 7,
                UserId = 6,
                EventId = 1,
                Status = "accepted"
            };

            var testEp7 = new EventParticipant()
            {
                Id = 8,
                UserId = 6,
                EventId = 2,
                Status = "accepted"
            };

            var testEp8 = new EventParticipant()
            {
                Id = 9,
                UserId = 4,
                EventId = 3,
                Status = "accepted"
            };

            var testEp9 = new EventParticipant()
            {
                Id = 10,
                UserId = 8,
                EventId = 2,
                Status = "accepted"
            };

            var testEp10 = new EventParticipant()
            {
                Id = 10,
                UserId = 7,
                EventId = 1,
                Status = "accepted"
            };

            //var post1 = new Post()
            //{
            //    Id = 1,
            //    Content = "Detta blir jättekul!!",
            //    Created = DateTime.Now,
            //    CreatorId = 1,
            //    EventId = 1
            //};

            //var post2 = new Post()
            //{
            //    Id = 2,
            //    Content = "Jäklar vad ösigt!!",
            //    Created = DateTime.Now,
            //    CreatorId = 3,
            //    EventId = 2
            //};

            //var post3 = new Post()
            //{
            //    Id = 3,
            //    Content = "Jag har köpt nya dojor ;)",
            //    Created = DateTime.Now,
            //    CreatorId = 2,
            //    EventId = 3
            //};

            context.Users.AddOrUpdate(testUser);
            context.Users.AddOrUpdate(testUser1);
            context.Users.AddOrUpdate(testUser2);
            context.Users.AddOrUpdate(testUser3);
            context.Users.AddOrUpdate(testUser4);
            context.Users.AddOrUpdate(testUser5);
            context.Users.AddOrUpdate(testUser6);
            context.Users.AddOrUpdate(testUser7);
            context.Users.AddOrUpdate(testUser8);

            context.Events.AddOrUpdate(testEvent1);
            context.Events.AddOrUpdate(testEvent2);
            context.Events.AddOrUpdate(testEvent3);

            context.EventParticipants.AddOrUpdate(testEp);
            context.EventParticipants.AddOrUpdate(testEp1);
            context.EventParticipants.AddOrUpdate(testEp2);
            context.EventParticipants.AddOrUpdate(testEp3);
            context.EventParticipants.AddOrUpdate(testEp4);
            context.EventParticipants.AddOrUpdate(testEp5);
            context.EventParticipants.AddOrUpdate(testEp6);
            context.EventParticipants.AddOrUpdate(testEp7);
            context.EventParticipants.AddOrUpdate(testEp8);
            context.EventParticipants.AddOrUpdate(testEp9);
            context.EventParticipants.AddOrUpdate(testEp10);

            //context.Posts.AddOrUpdate(post1);
            //context.Posts.AddOrUpdate(post2);
            //context.Posts.AddOrUpdate(post3);

            context.Drinks.AddOrUpdate(testDrink);

            context.SaveChanges();
        }
    }
}
