namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDrink : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Drinks", "AlcoholPercentage", c => c.String());
            AlterColumn("dbo.Drinks", "Volume", c => c.String());
            AlterColumn("dbo.Drinks", "Price", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Drinks", "Price", c => c.Double(nullable: false));
            AlterColumn("dbo.Drinks", "Volume", c => c.Double(nullable: false));
            AlterColumn("dbo.Drinks", "AlcoholPercentage", c => c.Double(nullable: false));
        }
    }
}
