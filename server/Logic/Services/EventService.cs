﻿using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;
        private readonly CalendarService _calendarService;

        public EventService(DatabaseContext context)
        {
            _context = context;
            _calendarService = CreateCalendarService();
        }

        public CalendarService CreateCalendarService()
        {
            //trivselapp@gmail.com exsitec123

            // If modifying these scopes, delete your previously saved credentials
            // at ~/.credentials/calendar-dotnet-quickstart.json
            string[] Scopes = { CalendarService.Scope.Calendar };
            string ApplicationName = "Exsitec TrivselApp Google Calendar";

            UserCredential credential;

            using (var stream =
                new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            // Create Google Calendar API service.
            var calendarService = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            return calendarService;
        }

        public void CreateGoogleCalendarService(EventForCreateDto ev)
        {
            //Create google event
            var googleEv = new Google.Apis.Calendar.v3.Data.Event() 
            {
                Summary = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                Start = new EventDateTime()
                {
                    DateTime = new DateTime(ev.StartDate.Year, ev.StartDate.Month, ev.StartDate.Day, 
                        ev.StartTime.Hour, ev.StartTime.Minute, 0),
                    TimeZone = "Europe/Stockholm"
                },
                End = new EventDateTime()
                {
                    DateTime = new DateTime(ev.EndDate.Year, ev.EndDate.Month, ev.EndDate.Day,
                        ev.EndTime.Hour, ev.EndTime.Minute, 0),
                    TimeZone = "Europe/Stockholm"
                },
                Attendees = ev.Users.Select(u => 
                    new EventAttendee() { DisplayName = u.Name, Email = u.Email }).ToList(),                
                Created = ev.CreateDate             
            };
            //googleEv.Attendees.Add(new EventAttendee() { Email = "obarthelsson@gmail.com" });
            //googleEv.Attendees.Add(new EventAttendee() { Email = "martinloord@live.com" });
            //googleEv.Attendees.Add(new EventAttendee() { Email = "daniel.goransson@exsitec.se" });

            //Insert in primary(default) calendar for account and send email notification
            var calendarId = "primary";
            EventsResource.InsertRequest insertRequest = _calendarService.Events.Insert(googleEv, calendarId);
            insertRequest.SendUpdates = 0;
            insertRequest.Execute();
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants
                .Select(u => u.User).Select(u => u.EventParticipants)).FirstOrDefaultAsync(e => e.Id == id);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.ToListAsync();

            return dbEvents.Select(EventForListTranslator.ToModel).ToList();
        }

        public async Task<EventForCreateDto> CreateEvent(EventForCreateDto ev)
        {

            var newEvent = new Database.Entities.Event()
            {
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                Image = ev.Image,
                StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                    ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0),
                EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month,
                    ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId
            };

            _context.Events.Add(newEvent);

            //bryta ut till två egna metoder nedan..

            var CheckIfUserIsAddedInOffice = new List<EventParticipant>();

            if (ev.Offices != null)
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(o => o.Office == office).ToListAsync();

                    foreach (var user in usersToAdd)
                    {

                        var newEventParticipant = new EventParticipant()
                        {
                            EventId = ev.Id,
                            UserId = user.Id
                        };

                        CheckIfUserIsAddedInOffice.Add(newEventParticipant);
                        _context.EventParticipants.Add(newEventParticipant);
                    }
                }
            }

            if (ev.Users != null)
            {
                foreach (var user in ev.Users)
                {
                    var newEventParticipant = new EventParticipant()
                    {
                        EventId = ev.Id,
                        UserId = user.Id
                    };

                    if (!CheckIfUserIsAddedInOffice.Exists(x => x.UserId == newEventParticipant.UserId))
                    {
                        _context.EventParticipants.Add(newEventParticipant);
                    }
                }
            }

            await _context.SaveChangesAsync();

            return EventForCreateTranslator.ToModel(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id);

            dbEvent.Title = ev.Title;
            dbEvent.Location = ev.Location;
            dbEvent.Description = ev.Description;
            dbEvent.Image = ev.Image;
            dbEvent.StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0);
            dbEvent.EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, 
                ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0);

            await _context.SaveChangesAsync();

            return EventForUpdateTranslator.ToModel(dbEvent);
        }

        public async Task<int> DeleteEvent(int id)
        {
            var dbEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            return id;
        }

        public async Task<EventForDetailedDto> AddEventParticipantStatus(int eventId, int userId, string answer)
        {
            //Check if participant already has answered to the event
            var participantExists = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            //Update participants answer if already answered
            if (participantExists != null)
            {
                participantExists.Status = answer;
            }
            else {

            //Add participants answer to db if not answered earlier
                var ep = new EventParticipant
            {
                EventId = eventId,
                UserId = userId,
                Status = answer
            };

            _context.EventParticipants.Add(ep);
            }

            await _context.SaveChangesAsync();

            var dbEvent = await _context.Events.Include(e => e.EventParticipants
               .Select(u => u.User)).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> UpdateParticipantStatus(int eventId, int userId, string answer)
        {
            var participant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            participant.Status = answer;

            await _context.SaveChangesAsync();

            var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();

            return dbEvent.Select(EventForUserListTranslator.ToModel).ToList();

        }

        public async Task<bool> SaveImage(int id, IFormFile image)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            pathToSave = pathToSave.Replace("Api", "Logic");

            //Tillfällig lösning, går inte att använda Path till app
            var folderName2 = Path.Combine("images", "event-images");
            var pathToSave2 = "C:\\Users\\andre\\TrivselAppV2\\app\\src\\assets\\images\\event-images";

            if (image.Length > 0)
            {
                var fileName = id.ToString() + Path.GetExtension(image.FileName);
                var fullPath = Path.Combine(pathToSave2, fileName);
                var dbPath = Path.Combine(folderName2, fileName);

                var files = Directory.GetFiles(pathToSave2, id.ToString() + ".*");
                if (files.Length > 0)
                {
                    foreach (var file in files)
                    {
                        File.Delete(file);
                    }
                }

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                _context.Events.Find(id).Image = dbPath;
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<string> GetImage(int id)
        {
            var dbEvent = await _context.Events.FindAsync(id);
            var imagePath = dbEvent.Image;
            var fullPath = Path.GetFullPath(imagePath);
            fullPath = fullPath.Replace("Api", "Logic");

            var fullPath2 = Path.GetFullPath(imagePath);
            
            return fullPath2;
        }

        //public async Task<HttpResponseMessage> GetImage(int id)
        //{
        //    var dbEvent = await _context.Events.FindAsync(id);
        //    var imagePath = dbEvent.Image;
        //    var fullPath = Path.GetFullPath(imagePath);
        //    fullPath = fullPath.Replace("Api", "Logic");

        //    using (var fs = new FileStream(fullPath, FileMode.Open))
        //    {
        //        HttpResponseMessage response = new HttpResponseMessage();
        //        response.Content = new StreamContent(fs);
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
        //        return response;
        //    }
        //}

        public async Task<ICollection<EventForUserListDto>> GetCurrentUserEvents(int userId)
        {
            var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();

            return dbEvent.Select(EventForUserListTranslator.ToModel).ToList();
        }

    }
}

