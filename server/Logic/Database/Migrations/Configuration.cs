namespace Logic.Database.Migrations
{
    using Logic.Database.Entities;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Data.Entity.Migrations;

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
            var office = new Office()
            {
                Id = 1,
                Name = "Linköping",
                Adress = "Snickaregatan 40, 582 26 Linköping",
                SwishNumber = "0700501914"
            };

            var office2 = new Office()
            {
                Id = 2,
                Name = "Stockholm",
                Adress = "Olof Palmes gata 13, 111 37 Stockholm",
                SwishNumber = "0767606702"
            };

            var office3 = new Office()
            {
                Id = 3,
                Name = "Göteborg",
                Adress = "Kungsportsavenyen 34, 411 36 Göteborg",
                SwishNumber = "0700501914"
            };

            var office4 = new Office()
            {
                Id = 4,
                Name = "Malmö",
                Adress = "Skeppsbron 5, 211 20 Malmö",
                SwishNumber = "0700501914"
            };

            var office5 = new Office()
            {
                Id = 5,
                Name = "Uppsala",
                Adress = "Dragarbrunnsgatan 46, 753 20 Uppsala",
                SwishNumber = "0767606702"
            };
            var office6 = new Office()
            {
                Id = 6,
                Name = "Örebro",
                Adress = "Järntorgsgatan 3a, 703 61 Örebro",
                SwishNumber = "0735469891"
            };

            var office7 = new Office()
            {
                Id = 7,
                Name = "Söderhamn",
                Adress = "Källgatan 9, 826 30 Söderhamn",
                SwishNumber = "0700501914"
            };
            var office8 = new Office()
            {
                Id = 8,
                Name = "Borlänge",
                Adress = "Forskargatan 3, 781 70 Borlänge",
                SwishNumber = "0700501914"
            };
            var office9 = new Office()
            {
                Id = 9,
                Name = "Helsingborg",
                Adress = "Florettgatan 29B, 254 67 Helsingborg",
                SwishNumber = "0700501914"
            };
            var office10 = new Office()
            {
                Id = 10,
                Name = "Karlstad",
                Adress = "Södra Kyrkogatan 6, 652 24 Karlstad",
                SwishNumber = "0700501914"
            };

            var testUser = new User()
            {
                Id = 1,
                Email = "test@test.se",
                Name = "Test Persson",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 1
            };

            var testUser1 = new User()
            {
                Id = 2,
                Email = "jerker@test.se",
                Name = "Jerker Persson",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 2
            };

            var testUser2 = new User()
            {
                Id = 3,
                Email = "magnus@test.se",
                Name = "Magnus Svensson",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 5
            };

            var testUser3 = new User()
            {
                Id = 4,
                Email = "zlatan@test.se",
                Name = "Zlatan Ibrahimovic",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 1
            };

            var testUser4 = new User()
            {
                Id = 5,
                Email = "kosovare@test.se",
                Name = "Kosovare Asllani",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 6
            };

            var testUser5 = new User()
            {
                Id = 6,
                Email = "philip@test.se",
                Name = "Philip Haglund",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 1
            };

            var testUser6 = new User()
            {
                Id = 7,
                Email = "sanna@test.se",
                Name = "Sanna Kallur",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 4
            };

            var testUser7 = new User()
            {
                Id = 8,
                Email = "martin@test.se",
                Name = "Martin De La Hoya",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 6
            };

            var testUser8 = new User()
            {
                Id = 9,
                Email = "hanna@test.se",
                Name = "Hanna Gustafsson",
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 2
            };
            var testUser9 = new User()
            {
                Id = 10,
                Email = "admin",
                Name = "admin",
                Admin = true,
                Password = _passwordHasher.HashPassword("test"),
                OfficeId = 2
            };


            var testEvent1 = new Event()
            {
                Id = 1,
                Title = "AW-fredag",
                Description = "Nu ska vi ha kul",
                ImageUrl = "assets/images/event-images/default_event.png",
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
                ImageUrl = "assets/images/event-images/default_event.png",
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
                ImageUrl = "assets/images/event-images/default_event.png",
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
                ImageUrl = "assets/images/event-images/default_event.png",
                Location = "Padelcenter",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 4
            };

            var testEvent5 = new Event()
            {
                Id = 5,
                Title = "UFC-night",
                Description = "Ta med snacks",
                ImageUrl = "assets/images/event-images/default_event.png",
                Location = "Hummelgatan 31",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 7
            };

            var testEvent6 = new Event()
            {
                Id = 6,
                Title = "Lunchträning",
                Description = "Ta med kläder, nu kör vi",
                ImageUrl = "assets/images/event-images/default_event.png",
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
                Description = "Anders bjuder på käk!",
                ImageUrl = "assets/images/event-images/default_event.png",
                Location = "Linköpingskontoret",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 5
            };

            var testEvent8 = new Event()
            {
                Id = 8,
                Title = "Cykelvasan",
                Description = "Avgång med buss 18.30 från centralstation",
                ImageUrl = "assets/images/event-images/default_event.png",
                Location = "Åre",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreateDate = DateTime.Now,
                CreatorId = 4
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
                EventId = 7,
                Status = "N/A"
            };

            var testEp12 = new EventParticipant()
            {
                Id = 13,
                UserId = 1,
                EventId = 6,
                Status = "N/A"
            };

            var testEp13 = new EventParticipant()
            {
                Id = 14,
                UserId = 4,
                EventId = 7,
                Status = "N/A"
            };

            var testEp14 = new EventParticipant()
            {
                Id = 15,
                UserId = 4,
                EventId = 6,
                Status = "N/A"
            };

            var post1 = new Post()
            {
                Id = 1,
                Content = "Detta blir jättekul!!",
                Created = DateTime.Now,
                CreatorId = 1,
                EventId = 1
            };

            var post2 = new Post()
            {
                Id = 2,
                Content = "Jäklar vad ösigt!!",
                Created = DateTime.Now,
                CreatorId = 3,
                EventId = 2
            };

            var post3 = new Post()
            {
                Id = 3,
                Content = "Jag har köpt nya dojor ;)",
                Created = DateTime.Now,
                CreatorId = 2,
                EventId = 3
            };

            var post4 = new Post()
            {
                Id = 4,
                Content = "Detta blir jättekul!!",
                Created = DateTime.Now,
                CreatorId = 1,
                EventId = 4
            };

            var post5 = new Post()
            {
                Id = 5,
                Content = "Gott!",
                Created = DateTime.Now,
                CreatorId = 3,
                EventId = 5
            };

            var post6 = new Post()
            {
                Id = 6,
                Content = "Perfekt, kommer!",
                Created = DateTime.Now,
                CreatorId = 2,
                EventId = 6
            };

            var post7 = new Post()
            {
                Id = 7,
                Content = "Nice!!",
                Created = DateTime.Now,
                CreatorId = 4,
                EventId = 7
            };

            var post8 = new Post()
            {
                Id = 8,
                Content = "Kalas :) ",
                Created = DateTime.Now,
                CreatorId = 4,
                EventId = 8
            };

            var testBeer = new Drink()
            {
                Id = 1,
                ProductNameBold = "Carlsberg Hof",
                Category = "Öl",
                AlcoholPercentage = 4,
                Volume = 50,
                Price = 10,
                Taste = "Standard ljus öl, rätt svag",
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
                Taste = "Trevligt sällskapsvin",
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
                Usage = "God på sommaren",
                BeverageDescriptionShort = "Läskande",
            };

            context.Offices.AddOrUpdate(office);
            context.Offices.AddOrUpdate(office2);
            context.Offices.AddOrUpdate(office3);
            context.Offices.AddOrUpdate(office4);
            context.Offices.AddOrUpdate(office5);
            context.Offices.AddOrUpdate(office6);
            context.Offices.AddOrUpdate(office7);
            context.Offices.AddOrUpdate(office8);
            context.Offices.AddOrUpdate(office9);
            context.Offices.AddOrUpdate(office10);

            context.Users.AddOrUpdate(testUser);
            context.Users.AddOrUpdate(testUser1);
            context.Users.AddOrUpdate(testUser2);
            context.Users.AddOrUpdate(testUser3);
            context.Users.AddOrUpdate(testUser4);
            context.Users.AddOrUpdate(testUser5);
            context.Users.AddOrUpdate(testUser6);
            context.Users.AddOrUpdate(testUser7);
            context.Users.AddOrUpdate(testUser8);
            context.Users.AddOrUpdate(testUser9);

            context.Events.AddOrUpdate(testEvent1);
            context.Events.AddOrUpdate(testEvent2);
            context.Events.AddOrUpdate(testEvent3);
            context.Events.AddOrUpdate(testEvent4);
            context.Events.AddOrUpdate(testEvent5);
            context.Events.AddOrUpdate(testEvent6);
            context.Events.AddOrUpdate(testEvent7);
            context.Events.AddOrUpdate(testEvent8);

            context.Posts.AddOrUpdate(post1);
            context.Posts.AddOrUpdate(post2);
            context.Posts.AddOrUpdate(post3);
            context.Posts.AddOrUpdate(post4);
            context.Posts.AddOrUpdate(post5);
            context.Posts.AddOrUpdate(post6);
            context.Posts.AddOrUpdate(post7);
            context.Posts.AddOrUpdate(post8);

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
            context.EventParticipants.AddOrUpdate(testEp11);
            context.EventParticipants.AddOrUpdate(testEp12);
            context.EventParticipants.AddOrUpdate(testEp13);
            context.EventParticipants.AddOrUpdate(testEp14);

            context.Drinks.AddOrUpdate(testBeer);
            context.Drinks.AddOrUpdate(testWine);
            context.Drinks.AddOrUpdate(testCider);

            context.SaveChanges();
        }
    }
}
