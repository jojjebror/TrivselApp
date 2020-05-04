using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Database.Entities
{
    public class EventParticipant : BaseEntity
    {
        public int UserId { get; set; }
        public int EventId { get; set; }
        public virtual User User { get; set; }
        public virtual Event Event { get; set; }
        public string Status { get; set; } = "N/A";
    }
}
