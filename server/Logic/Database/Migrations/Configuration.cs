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
                Office = "Link�ping"
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
                Office = "Link�ping"
            };

            var testUser4 = new User()
            {
                Id = 5,
                Email = "hanna@test.se",
                Name = "Hanna Fransson",
                Password = _passwordHasher.HashPassword("test"),
                Office = "�rebro"
            };

            var testUser5 = new User()
            {
                Id = 6,
                Email = "philip@test.se",
                Name = "Philip Haglund",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Link�ping"
            };

            var testUser6 = new User()
            {
                Id = 7,
                Email = "sanna@test.se",
                Name = "Sanna Kallur",
                Password = _passwordHasher.HashPassword("test"),
                Office = "Malm�"
            };

            var testUser7 = new User()
            {
                Id = 8,
                Email = "martin@test.se",
                Name = "Martin De La Hoya",
                Password = _passwordHasher.HashPassword("test"),
                Office = "�rebro"
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
                Description = "Nu ska vi ha j�ttekul",
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

            var testEvent4 = new Event()
            {
                Id = 4,
                Title = "Padeltunering",
                Description = "Ta med er racket, mer information kommer",
                Image = "assets/images/event-images/default_event.png",
                Location = "Padelcenter",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 5
            };

            var testEvent5 = new Event()
            {
                Id = 5,
                Title = "UFC-night",
                Description = "Ta med snacks",
                Image = "assets/images/event-images/default_event.png",
                Location = "Hummelgatan 31",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 7
            };

            var testEvent6 = new Event()
            {
                Id = 6,
                Title = "Lunchtr�ning",
                Description = "Ta med kl�der, nu k�r vi",
                Image = "assets/images/event-images/default_event.png",
                Location = "Friskis & Svettis",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 8
            };

            var testEvent7 = new Event()
            {
                Id = 7,
                Title = "Brunch",
                Description = "Anders bjuder p� k�k!",
                Image = "assets/images/event-images/default_event.png",
                Location = "Link�pingskontoret",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 5
            };

            var testEvent8 = new Event()
            {
                Id = 8,
                Title = "Cykelvasan",
                Description = "Avg�ng med buss 18.30 fr�n centralstation",
                Image = "assets/images/event-images/default_event.png",
                Location = "�re",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 4
            };

            var testBeer = new Drink()
            {
                Id = 1,
                ProductNameBold = "Carlsberg Hof",
                Category = "�l",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 10,
                Taste = "Standard ljus �l, r�tt svag",
                Usage = "Gott till grillat",
                BeverageDescriptionShort = "Klen smak",
            };

            var testWine = new Drink()
            {
                Id = 2,
                ProductNameBold = "L'amarone",
                Category = "Vin",
                AlcoholPercentage = 12,
                Volume = 50,
                Price = 20,
                Taste = "Trevligt s�llskapsvin",
                Usage = "Gott till grillat",
                BeverageDescriptionShort = "Trevlig",
            };

            var testCider = new Drink()
            {
                Id = 3,
                ProductNameBold = "Briska",
                Category = "Cider",
                AlcoholPercentage = 4,
                Volume = 33,
                Price = 20,
                Taste = "Fruktig",
                Usage = "God p� sommaren",
                BeverageDescriptionShort = "L�skande",
            };

            var kategori = new Drink()
            {
                Id = 4,
                ProductNameBold = "Budget",
                Category = "Kategori",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 10,
                Taste = "",
                Usage = "",
                BeverageDescriptionShort = "",
            };

            var kategori2 = new Drink()
            {
                Id = 5,
                ProductNameBold = "Standard",
                Category = "Kategori",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 15,
                Taste = "",
                Usage = "",
                BeverageDescriptionShort = "",
            };

            var kategori3 = new Drink()
            {
                Id = 6,
                ProductNameBold = "Luxury",
                Category = "Kategori",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 20,
                Taste = "",
                Usage = "",
                BeverageDescriptionShort = "",
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
                Id = 11,
                UserId = 7,
                EventId = 1,
                Status = "accepted"
            };

            var testEp11 = new EventParticipant()
            {
                Id = 12,
                UserId = 1,
                EventId = 13,
                Status = "N/A"
            };

            var testEp12 = new EventParticipant()
            {
                Id = 13,
                UserId = 1,
                EventId = 6,
                Status = "N/A"
            };

            //var post1 = new Post()
            //{
            //    Id = 1,
            //    Content = "Detta blir j�ttekul!!",
            //    Created = DateTime.Now,
            //    CreatorId = 1,
            //    EventId = 1
            //};

            //var post2 = new Post()
            //{
            //    Id = 2,
            //    Content = "J�klar vad �sigt!!",
            //    Created = DateTime.Now,
            //    CreatorId = 3,
            //    EventId = 2
            //};

            //var post3 = new Post()
            //{
            //    Id = 3,
            //    Content = "Jag har k�pt nya dojor ;)",
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
            context.Events.AddOrUpdate(testEvent4);
            context.Events.AddOrUpdate(testEvent5);
            context.Events.AddOrUpdate(testEvent6);
            context.Events.AddOrUpdate(testEvent7);
            context.Events.AddOrUpdate(testEvent8);

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


            //context.Posts.AddOrUpdate(post1);
            //context.Posts.AddOrUpdate(post2);
            //context.Posts.AddOrUpdate(post3);

            context.Drinks.AddOrUpdate(testBeer);
            context.Drinks.AddOrUpdate(testWine);
            context.Drinks.AddOrUpdate(testCider);
            context.Drinks.AddOrUpdate(kategori);
            context.Drinks.AddOrUpdate(kategori2);
            context.Drinks.AddOrUpdate(kategori3);

            context.SaveChanges();
        }
    }
}
