using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Linq;

namespace Logic.Translators
{
    public class EventTranslator
    {
        public static EventForCreateDto ToEventForCreateDto(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForCreateDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                ImageUrl = ev.ImageUrl,
                Location = ev.Location,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                CreatorId = ev.CreatorId,
                CreateDate = ev.CreateDate
            };
        }

        public static EventForDetailedDto ToEventForDetailedDto(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForDetailedDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                ImageUrl = ev.ImageUrl,
                Location = ev.Location,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                CreatorId = ev.CreatorId,
                CreatorName = ev.Creator.Name,

                Users = ev.EventParticipants.Select(u =>
                    new EventParticipantsDto
                    {
                        Id = u.UserId,
                        Name = u.User.Name,
                        Status = u.Status
                    }).ToList(),

                Posts = ev.Posts.Select(p =>
                    new PostDto
                    {
                        Id = p.Id,
                        Content = p.Content,
                        Created = p.Created,
                        CreatorId = p.CreatorId,
                        EventId = p.EventId,
                        CreatorName = p.Creator.Name
                    }).ToList()
            };
        }

        public static EventForListDto ToEventForListDto(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForListDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                ImageUrl = ev.ImageUrl,
                Location = ev.Location,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                CreatorId = ev.CreatorId,
                CreatorName = ev.Creator.Name
            };
        }

        public static EventForUpdateDto ToEventForUpdateDto(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForUpdateDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                Location = ev.Location,
                ImageUrl = ev.ImageUrl,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate
            };
        }

        public static EventForUserListDto ToEventForUserListDto(EventParticipant ev)
        {
            if (ev == null)
                return null;

            return new EventForUserListDto
            {
                Id = ev.Event.Id,
                Title = ev.Event.Title,
                Description = ev.Event.Description,
                ImageUrl = ev.Event.ImageUrl,
                Location = ev.Event.Location,
                StartDate = ev.Event.StartDate,
                EndDate = ev.Event.EndDate,
                CreatorId = ev.Event.CreatorId,
                Status = ev.Status,
                CreatorName = ev.Event.Creator.Name
            };
        }
    }
}
