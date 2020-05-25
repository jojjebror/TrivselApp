namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mergeRemoveFields : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Drinks", "AlcoholPercentage");
            DropColumn("dbo.Drinks", "Usage");
            DropColumn("dbo.Drinks", "BeverageDescriptionShort");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Drinks", "BeverageDescriptionShort", c => c.String());
            AddColumn("dbo.Drinks", "Usage", c => c.String());
            AddColumn("dbo.Drinks", "AlcoholPercentage", c => c.Int(nullable: false));
        }
    }
}
