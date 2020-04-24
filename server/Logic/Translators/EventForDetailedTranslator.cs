﻿using Logic.Database.Entities;
using Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Translators
{
    public class EventForDetailedTranslator
    {
        public static EventForDetailedDto ToModel(Event ev)
        {
            if (ev == null)
                return null;

            return new EventForDetailedDto
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                Image = ev.Image,
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
    }
}