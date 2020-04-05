using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Models
{
    public class EventParticipantsDto : BaseDto
    {
        public string Name { get; set; }

        public bool Accepted { get; set; }

        public int EventId { get; set; } //bort?

    }
}
