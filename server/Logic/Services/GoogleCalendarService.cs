using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Logic.Database;
using Logic.Database.Entities;
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

        private readonly string calendarId = "trivselapp@gmail.com"; //primary
        public GoogleCalendarService(DatabaseContext context)
        {
            _context = context;
            _calendarService = CreateGoogleCalendarService();
        }

        public CalendarService CreateGoogleCalendarService()
        {
            string[] scopes = { CalendarService.Scope.Calendar };
            GoogleCredential credential;
            //ServiceAccountCredential credential;

            using (var stream = new FileStream("serviceAccountCredentials.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                                 .CreateScoped(scopes);
            }

            // Create the Calendar service.
            var calendarService = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "TrivselApp"
            });

            return calendarService;
        }

        //public CalendarService CreateGoogleCalendarService()
        //{
        //    // If modifying these scopes, delete your previously saved credentials
        //    // at ~/.credentials/calendar-dotnet-quickstart.json
        //    string[] Scopes = { CalendarService.Scope.Calendar };
        //    string ApplicationName = "Google Calendar API .NET Quickstart";

        //    UserCredential credential;

        //    using (var stream =
        //        new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
        //    {
        //        // The file token.json stores the user's access and refresh tokens, and is created
        //        // automatically when the authorization flow completes for the first time.
        //        string credPath = "token.json";
        //        credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
        //            GoogleClientSecrets.Load(stream).Secrets,
        //            Scopes,
        //            "user",
        //            CancellationToken.None,
        //            new FileDataStore(credPath, true)).Result;
        //    }

        //    // Create Google Calendar API service.
        //    var calendarService = new CalendarService(new BaseClientService.Initializer()
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = ApplicationName,
        //    });

        //    return calendarService;
        //}

        public string CreateGoogleEvent(Database.Entities.Event ev, List<EventParticipant> eps)
        {
            string googleEventId = null;

            try
            {
                //Create google event
                var googleEv = new Google.Apis.Calendar.v3.Data.Event()
                {
                    Summary = ev.Title,
                    Description = ev.Description,
                    Location = ev.Location,
                    Start = new EventDateTime
                    {
                        DateTime = ev.StartDate,
                        TimeZone = "Europe/Stockholm"
                    },
                    End = new EventDateTime
                    {
                        DateTime = ev.EndDate,
                        TimeZone = "Europe/Stockholm"
                    },
                    Created = ev.CreateDate
                };

                //Get all users details that is participating
                var users = new List<User>();
                foreach (var ep in eps)
                {
                    users.Add(_context.Users.Find(ep.UserId));
                }
                var organizer = users.Find(u => u.Id == ev.CreatorId);

                //Inserting many attendees into the event causes calendar usage exceed, 
                //comment out the attendee lines if internal server error 500
                //googleEv.Attendees = eps.Select(ep =>
                //    new EventAttendee { DisplayName = ep.User.Name, Email = ep.User.Email }).ToList();
                //googleEv.Attendees.FirstOrDefault(a => a.Email == organizer.Email).ResponseStatus = "accepted";
                //googleEv.Attendees.Add(new EventAttendee { Email = "obarthelsson@gmail.com" });

                //Insert in primary(default) calendar for account and send email notification to all attendees
                var insertRequest = _calendarService.Events.Insert(googleEv, calendarId);
                insertRequest.SendUpdates = 0;
                var createdGoogleEv = insertRequest.Execute();
                googleEventId = createdGoogleEv.Id;
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }

            return googleEventId;
        }

        public Google.Apis.Calendar.v3.Data.Event GetGoogleEvent(string googleEventId)
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

        public void UpdateGoogleEvent(Database.Entities.Event ev)
        {
            try
            {
                var googleEv = GetGoogleEvent(ev.GoogleEventId);

                googleEv.Summary = ev.Title;
                googleEv.Description = ev.Description;
                googleEv.Location = ev.Location;
                googleEv.Start.DateTime = ev.StartDate;
                googleEv.End.DateTime = ev.EndDate;

                var updateRequest = _calendarService.Events.Update(googleEv, calendarId, ev.GoogleEventId);
                updateRequest.SendUpdates = 0;
                updateRequest.Execute();
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }

        public void UpdateGoogleEventParticipantStatus(EventParticipant ep)
        {
            try
            {
                var googleEventId = ep.Event.GoogleEventId;
                var googleEv = GetGoogleEvent(googleEventId);

                var status = ep.Status;
                if (ep.Status == "N/A")
                    status = "needsAction";

                if (googleEv.Attendees.FirstOrDefault(a => a.Email == ep.User.Email) != null)
                {
                    googleEv.Attendees.FirstOrDefault(a =>
                        a.Email == ep.User.Email).ResponseStatus = status;
                }
                else
                {
                    googleEv.Attendees.Add(new EventAttendee
                    { DisplayName = ep.User.Name, Email = ep.User.Email, ResponseStatus = status });
                }

                var updateRequest = _calendarService.Events.Update(googleEv, calendarId, googleEventId);
                updateRequest.SendUpdates = 0;
                updateRequest.Execute();
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }

        public void DeleteGoogleEvent(string id)
        {
            try
            {
                var deleteRequest = _calendarService.Events.Delete(calendarId, id);
                deleteRequest.SendUpdates = 0;
                deleteRequest.Execute();
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }
    }
}
