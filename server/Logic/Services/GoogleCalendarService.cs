using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;

namespace Logic.Services
{
    public class GoogleCalendarService
    {
        // trivselapp@gmail.com exsitec123

        private readonly DatabaseContext _context;
        private readonly CalendarService _calendarService;

        private string calendarId = "primary";
        public GoogleCalendarService(DatabaseContext context)
        {
            _context = context;
            _calendarService = CreateGoogleCalendarService();
        }
        public CalendarService CreateGoogleCalendarService()
        {
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

            if (eps != null)
            {
                googleEv.Attendees = eps.Select(ep =>
                    new EventAttendee { DisplayName = ep.User.Name, Email = ep.User.Email }).ToList();
            }
            googleEv.Attendees.FirstOrDefault(a => a.Email == organizer.Email).ResponseStatus = "accepted";

            //Insert in primary(default) calendar for account and send email notification to all attendees
            var insertRequest = _calendarService.Events.Insert(googleEv, calendarId);
            insertRequest.SendUpdates = 0;

            string googleEventId = null;

            try
            {
                var createdGoogleEv = insertRequest.Execute();
                googleEventId = createdGoogleEv.Id;
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }

            return googleEventId;
        }

        public Google.Apis.Calendar.v3.Data.Event GetGoogleCalendarEvent(string googleEventId)
        {
            var googleEv = new Google.Apis.Calendar.v3.Data.Event();

            try
            {
                googleEv = _calendarService.Events.Get(calendarId, googleEventId).Execute();
            } 
            catch (Exception e)
            {
                e.Message.ToString();
            }
            
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

            try
            {
                _calendarService.Events.Update(googleEv, calendarId, googleEventId).Execute();
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }

        public void DeleteGoogleCalendarEvent(string id)
        {
            try
            {
                _calendarService.Events.Delete(calendarId, id).Execute();
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }
    }
}
