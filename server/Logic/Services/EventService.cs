using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;
        private readonly GoogleCalendarService _googleCalendarService;
        private readonly CloudinaryService _cloudinaryService;

        public EventService(DatabaseContext context)
        {
            _context = context;
            _googleCalendarService = new GoogleCalendarService();
            _cloudinaryService = new CloudinaryService();
        }

        public async Task<EventForDetailedDto> GetEvent(int id)
        {
            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == id);

            return EventTranslator.ToEventForDetailedDto(dbEvent);
        }

        public async Task<ICollection<EventForListDto>> GetEvents()
        {
            SyncEventsWithGoogleEvents();

            var dbEvents = await _context.Events.Include(e => e.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForListDto).ToList();
        }

        public async Task<EventForCreateDto> CreateEvent(EventForCreateDto ev)
        {
            var newEvent = new Event()
            {
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                    ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0),
                EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month,
                    ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0),
                CreateDate = ev.CreateDate,
                CreatorId = ev.CreatorId
            };

            _context.Events.Add(newEvent);

            var eventParticipants = new List<EventParticipant>() { new EventParticipant 
                { EventId = ev.Id, UserId = ev.CreatorId, Status = "accepted" } };

            if (ev.Offices.First() != "")
            {
                foreach (var office in ev.Offices)
                {
                    var usersToAdd = await _context.Users.Where(u => u.Office == office && u.Id != ev.CreatorId).ToListAsync();

                    eventParticipants.AddRange(usersToAdd.Select(u =>
                        new EventParticipant { EventId = ev.Id, UserId = u.Id }).ToList());
                }
            }

            if (ev.Users.Any())
            {
                foreach (var user in ev.Users)
                {
                    if (!eventParticipants.Exists(ep => ep.EventId == ev.Id && ep.UserId == user.Id))
                    {
                        eventParticipants.Add(new EventParticipant { EventId = ev.Id, UserId = user.Id });
                    }
                }
            }

            _context.EventParticipants.AddRange(eventParticipants);

            await _context.SaveChangesAsync();
            
            var attendees = await _context.EventParticipants.Include(ep => ep.User)
                .Where(u => u.EventId == newEvent.Id).Select(u => u.User).ToListAsync();

            //Create a google calendar event and returns Google Event Id
            var googleEventId = _googleCalendarService.CreateGoogleEvent(newEvent, attendees);
            newEvent.GoogleEventId = googleEventId;

            await _context.SaveChangesAsync();

            return EventTranslator.ToEventForCreateDto(newEvent);
        }

        public async Task<EventForUpdateDto> UpdateEvent(int id, EventForUpdateDto ev)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            dbEvent.Title = ev.Title;
            dbEvent.Location = ev.Location;
            dbEvent.Description = ev.Description;
            dbEvent.StartDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month,
                ev.StartDate.Day, ev.StartTime.Hour, ev.StartTime.Minute, 0);
            dbEvent.EndDate = new DateTime(ev.EndDate.Year, ev.EndDate.Month, 
                ev.EndDate.Day, ev.EndTime.Hour, ev.EndTime.Minute, 0);

            await _context.SaveChangesAsync();

            _googleCalendarService.UpdateGoogleEvent(dbEvent);

            return EventTranslator.ToEventForUpdateDto(dbEvent);
        }

        public void SyncEventsWithGoogleEvents()
        {
            //Get all google events that has changed
            var googleEvents = _googleCalendarService.CheckForChangesInGoogleEvents();

            try
            {
                foreach (var googleEv in googleEvents)
                {
                    //Get the event from db that needs to be updated and all the eventparticipants for the event
                    var dbEvent = _context.Events.FirstOrDefault(e => e.GoogleEventId == googleEv.Id);
                    var dbEventParticipants = _context.EventParticipants.Include(u => u.User)
                        .Where(ep => ep.EventId == dbEvent.Id).ToList();

                    //Check if the google event has been deleted == cancelled
                    if (googleEv.Status == "cancelled")
                    {
                        //Deletes the event from db
                        var deletedEvId = DeleteEvent(dbEvent.Id);
                    }
                    else
                    {
                        dbEvent.Title = googleEv.Summary;
                        dbEvent.Location = googleEv.Location;
                        dbEvent.Description = googleEv.Description;
                        dbEvent.StartDate = googleEv.Start.DateTime.Value;
                        dbEvent.EndDate = googleEv.End.DateTime.Value;

                        var totalAttendees = googleEv.Attendees.Count;
                        var totalEventParticipants = dbEventParticipants.Count;

                        //If the attendees are lesser than the db eventparticipants and greater than 0
                        //then the ones that does not exist in the google event should be removed
                        if (totalAttendees < totalEventParticipants && totalAttendees > 0)
                        {
                            var googleEps = new List<EventParticipant>();

                            foreach (var attendee in googleEv.Attendees)
                            {
                                googleEps.Add(dbEventParticipants.FirstOrDefault(ep => ep.User.Email == attendee.Email));
                            }

                            //Deletes all db eventparticipants except for the ones that is in the google event
                            _context.EventParticipants.RemoveRange(dbEventParticipants.Except(googleEps));
                        }
                        else
                        {
                            foreach (var attendee in googleEv.Attendees)
                            {
                                var dbEp = dbEventParticipants.FirstOrDefault(ep => ep.User.Email == attendee.Email);

                                //If the eventparticipant does not exist then create it
                                if (dbEp == null)
                                {
                                    dbEp = new EventParticipant
                                    {
                                        EventId = dbEvent.Id,
                                        UserId = _context.Users.FirstOrDefault(u =>
                                            u.Email == attendee.Email).Id
                                    };

                                    _context.EventParticipants.Add(dbEp);
                                }

                                if (attendee.ResponseStatus == "accepted"
                                            || attendee.ResponseStatus == "declined")
                                {
                                    dbEp.Status = attendee.ResponseStatus;
                                }
                            }
                        }
                    }
                    _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                e.Message.ToString();
            }
        }

        public async Task<int> DeleteEvent(int id)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            _context.Events.Remove(dbEvent);
            await _context.SaveChangesAsync();

            //Deletes the uploaded image
            _cloudinaryService.DeleteImage(dbEvent.ImageId);

            //Deletes the event in google calendar
            _googleCalendarService.DeleteGoogleEvent(dbEvent.GoogleEventId);

            return id;
        }

        public async Task<EventForDetailedDto> AddEventParticipantStatus(int eventId, int userId, string answer)
        {
            //Check if participant already exist and has answered to the event
            var eventParticipant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            //Update participants answer if already answered
            if (eventParticipant == null)
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

            eventParticipant.Status = answer;

            await _context.SaveChangesAsync();

            //Update the participants status for the google calendar event
            var updatedEp = await _context.EventParticipants.Include(u => u.User).Include(e => e.Event)
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);
            
            _googleCalendarService.UpdateGoogleEventParticipantStatus(updatedEp);

            var dbEvent = await _context.Events.Include(e => e.EventParticipants.Select(u => u.User))
                .Include(p => p.Posts.Select(po => po.Creator)).Include(e => e.Creator).FirstOrDefaultAsync(e => e.Id == eventId);

            return EventTranslator.ToEventForDetailedDto(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> UpdateParticipantStatus(int eventId, int userId, string answer)
        {
            var participant = await _context.EventParticipants
                .FirstOrDefaultAsync(ep => ep.EventId == eventId && ep.UserId == userId);

            participant.Status = answer;

            await _context.SaveChangesAsync();

            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForUserListDto).ToList();

        }

        public async Task<EventForCreateDto> UploadImage(int id, IFormFile image)
        {
            var dbEvent = await _context.Events.FindAsync(id);

            var uploadResult = _cloudinaryService.UploadImage(image, dbEvent.ImageId);

            dbEvent.ImageId = uploadResult.PublicId;
            dbEvent.ImageUrl = uploadResult.Uri.ToString();

            await _context.SaveChangesAsync();

            return EventTranslator.ToEventForCreateDto(dbEvent);
        }

        public async Task<ICollection<EventForUserListDto>> GetCurrentUserEvents(int userId)
        {
            // old one, keep.... var dbEvent = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId).ToListAsync();
            var dbEvents = await _context.EventParticipants.Include(e => e.Event).Where(u => u.UserId == userId)
                .Include(us => us.Event.Creator).ToListAsync();

            return dbEvents.Select(EventTranslator.ToEventForUserListDto).ToList();
        }
    }
}

