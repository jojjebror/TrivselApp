using System.Collections.Generic;

namespace Logic.Database.Entities
{

    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public int Credit { get; set; }
        public string GoogleId { get; set; }
        public int? OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<EventParticipant> EventParticipants { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
