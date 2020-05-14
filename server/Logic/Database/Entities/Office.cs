using System.Collections.Generic;

namespace Logic.Database.Entities
{
    public class Office : BaseEntity
    {
        public string Name { get; set; }
        public string Adress { get; set; }
        public string SwishNumber { get; set; }
        public string Info { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
