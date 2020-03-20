namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EventParticipants : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EventParticipants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        EventId = c.Int(nullable: false),
                        Accepted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
                .ForeignKey("dbo.Events", t => t.EventId, cascadeDelete: false)
                .Index(t => t.UserId)
                .Index(t => t.EventId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventParticipants", "EventId", "dbo.Events");
            DropForeignKey("dbo.EventParticipants", "UserId", "dbo.Users");
            DropIndex("dbo.EventParticipants", new[] { "EventId" });
            DropIndex("dbo.EventParticipants", new[] { "UserId" });
            DropTable("dbo.EventParticipants");
        }
    }
}
