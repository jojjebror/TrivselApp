namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MergeInitGoogleEventId : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Drinks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductNameBold = c.String(),
                        Category = c.String(),
                        AlcoholPercentage = c.Int(nullable: false),
                        Volume = c.Int(nullable: false),
                        Price = c.Int(nullable: false),
                        Usage = c.String(),
                        Taste = c.String(),
                        BeverageDescriptionShort = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EventParticipants",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        EventId = c.Int(nullable: false),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
                .ForeignKey("dbo.Events", t => t.EventId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.EventId);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        Location = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        GoogleEventId = c.String(),
                        CreatorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId, cascadeDelete: false)
                .Index(t => t.CreatorId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        Created = c.DateTime(nullable: false),
                        CreatorId = c.Int(nullable: false),
                        EventId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.CreatorId, cascadeDelete: false)
                .ForeignKey("dbo.Events", t => t.EventId, cascadeDelete: true)
                .Index(t => t.CreatorId)
                .Index(t => t.EventId);
            
            AddColumn("dbo.Users", "Office", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventParticipants", "EventId", "dbo.Events");
            DropForeignKey("dbo.Posts", "EventId", "dbo.Events");
            DropForeignKey("dbo.Posts", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.Events", "CreatorId", "dbo.Users");
            DropForeignKey("dbo.EventParticipants", "UserId", "dbo.Users");
            DropIndex("dbo.Posts", new[] { "EventId" });
            DropIndex("dbo.Posts", new[] { "CreatorId" });
            DropIndex("dbo.Events", new[] { "CreatorId" });
            DropIndex("dbo.EventParticipants", new[] { "EventId" });
            DropIndex("dbo.EventParticipants", new[] { "UserId" });
            DropColumn("dbo.Users", "Office");
            DropTable("dbo.Posts");
            DropTable("dbo.Events");
            DropTable("dbo.EventParticipants");
            DropTable("dbo.Drinks");
        }
    }
}
