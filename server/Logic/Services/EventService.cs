using Google.Apis.Auth.OAuth2;
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

        public EventService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == id);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            var dbEvents = await _context.Events.Include(e => e.Creator).ToListAsync();

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

            var eventParticipants = new List<EventParticipant>();
            eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = ev.CreatorId, Status = "accepted" });

            if (ev.Offices.Any())
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(o => (o.Office == office && o.Id != ev.CreatorId)).ToListAsync();
                    eventParticipants.AddRange(usersToAdd.Select(u =>
                        new EventParticipant { EventId = ev.Id, UserId = u.Id }).ToList());
                }
            }

            if (ev.Users != null)
            {
                foreach (var user in ev.Users)
                {
                    if (!eventParticipants.Exists(ep => (ep.EventId == ev.Id && ep.UserId == user.Id)))
                    {
                        eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = user.Id });
                    }
                }
            }

            _context.EventParticipants.AddRange(eventParticipants);

            //Create a google calendar event and returns Google Event Id
            var googleEventId = CreateGoogleCalendarEvent(ev, eventParticipants);
            newEvent.GoogleEventId = googleEventId;

            await _context.SaveChangesAsync();

            return EventForCreateTranslator.ToModel(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events.FindAsync(id);

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
            var dbEvent = await _context.Events.FindAsync(id);

            var folderName = Path.Combine("assets", "images", "event-images");
            var imageFolderPath = Path.GetFullPath(folderName).Replace("server\\Api", "app\\src");

            //Deletes all images with the id
            DeleteImageFiles(id, imageFolderPath);

            DeleteGoogleCalendarEvent(dbEvent.GoogleEventId);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            return id;
        }

        public async Task<EventForDetailedDto> AddEventParticipantStatus(int eventId, int userId, string answer)
        {
            //Check if participant already exist and has answered to the event
            var eventParticipant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            //Update participants answer if already answered
            if (eventParticipant != null)
            {
                eventParticipant.Status = answer;
            } 
            else
            {
                //Add participants answer to db if not answered earlier
                var newEp = new EventParticipant
                {
                    EventId = eventId,
                    UserId = userId,
                    Status = answer
                };

                _context.EventParticipants.Add(newEp);
            }

            await _context.SaveChangesAsync();

            //Update the participants status for the google calendar event
            var updatedEp = await _context.EventParticipants.Include(u => u.User).Include(e => e.Event)
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            if (updatedEp.Event.GoogleEventId != null)
            {
                UpdateGoogleCalendarEventParticipantStatus(updatedEp);
            }
                
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
            .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventForDetailedTranslator.ToModel(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> UpdateParticipantStatus(int eventId, int userId, string answer)
        {
            var participant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            participant.Status = answer;

            await _context.SaveChangesAsync();

            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventForUserListTranslator.ToModel).ToList();

        }

        public async Task<EventForCreateDto> SaveImage(int id, IFormFile image)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            if (image.Length > 0)
            {
                var folderName = Path.Combine("assets", "images", "event-images");
                var pathToSave = Path.GetFullPath(folderName).Replace("server\\Api", "app\\src");

                var fileName = id.ToString() + Path.GetExtension(image.FileName);
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                DeleteImageFiles(id, pathToSave);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                dbEvent.Image = dbPath;

                await _context.SaveChangesAsync();
            }

            return EventForCreateTranslator.ToModel(dbEvent);
        }

        public void DeleteImageFiles(int id, string path)
        {
            var files = Directory.GetFiles(path, id.ToString() + ".*");
            if (files.Length > 0)
            {
                foreach (var file in files)
                {
                    File.Delete(file);
                }
            }
        }

        public async Task<ICollection<EventForUserListDto>> GetCurrentUserEvents(int userId)
        {
            // old one, keep.... var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();
            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventForUserListTranslator.ToModel).ToList();
        }

        public CalendarService CreateGoogleCalendarService()
        {
            // trivselapp@gmail.com exsitec123
            // If modifying these scopes, delete your previously saved credentials
            // at ~/.credentials/calendar-dotnet-quickstart.json
            string[] Scopes = { CalendarService.Scope.Calendar };
            string ApplicationName = "Google Calendar API .NET Quickstart";

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

        public string CreateGoogleCalendarEvent(EventForCreateDto ev, List<EventParticipant> eps)
        {
            //Get all users details that is participating
            var users = new List<User>();
            foreach (var ep in eps)
            {
                users.Add(_context.Users.Find(ep.UserId));
            }
            var organizer = users.Find(u => u.Id == ev.CreatorId);

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
                Created = ev.CreateDate
            };

            if (eps != null) {
                googleEv.Attendees = eps.Select(ep => 
                    new EventAttendee { DisplayName = ep.User.Name, Email = ep.User.Email }).ToList();
            }
            googleEv.Attendees.FirstOrDefault(a => a.Email == organizer.Email).ResponseStatus = "accepted";

            //Insert in primary(default) calendar for account and send email notification to all attendees
            var calendarService = CreateGoogleCalendarService();
            var calendarId = "primary";
            var insertRequest = calendarService.Events.Insert(googleEv, calendarId);
            insertRequest.SendUpdates = 0;
            string googleEventId = null;
            try
            {
                var createdGoogleEv = insertRequest.Execute();
                googleEventId = createdGoogleEv.Id;
            } catch (Exception e)
            {
                e.Message;
            }
            return googleEventId;
        }

        public Google.Apis.Calendar.v3.Data.Event GetGoogleCalendarEvent(string googleEventId)
        {
            var calendarService = CreateGoogleCalendarService();
            var calendarId = "primary";
            var googleEv = calendarService.Events.Get(calendarId, googleEventId).Execute();

            return googleEv;
        }

        public void UpdateGoogleCalendarEventParticipantStatus(EventParticipant ep)
        {
            var googleEventId = ep.Event.GoogleEventId;
            var googleEv = GetGoogleCalendarEvent(googleEventId);

            var status = ep.Status;
            if (ep.Status == "N/A")
                status = "needsAction";

            if (googleEv.Attendees.FirstOrDefault(a => a.Email == ep.User.Email) != null)
            {
                googleEv.Attendees.FirstOrDefault(a => a.Email == ep.User.Email).ResponseStatus = status;
            } 
            else
            {
                googleEv.Attendees.Add(new EventAttendee 
                { DisplayName = ep.User.Name, Email = ep.User.Email, ResponseStatus = status });
            }

            var calendarService = CreateGoogleCalendarService();
            var calendarId = "primary";
            calendarService.Events.Update(googleEv, calendarId, googleEventId).Execute();
        }

        public void DeleteGoogleCalendarEvent(string id)
        {
            var calendarService = CreateGoogleCalendarService();
            var calendarId = "primary";
            calendarService.Events.Delete(calendarId, id).Execute();
        }
    }
}

