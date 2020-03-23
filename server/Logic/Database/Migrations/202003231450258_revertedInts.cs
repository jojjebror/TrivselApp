namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class revertedInts : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Drinks", "AlcoholPercentage", c => c.Double(nullable: false));
            AlterColumn("dbo.Drinks", "Volume", c => c.Int(nullable: false));
            AlterColumn("dbo.Drinks", "Price", c => c.Int(nullable: false));
            DropColumn("dbo.Drinks", "ProductId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Drinks", "ProductId", c => c.String());
            AlterColumn("dbo.Drinks", "Price", c => c.String());
            AlterColumn("dbo.Drinks", "Volume", c => c.String());
            AlterColumn("dbo.Drinks", "AlcoholPercentage", c => c.String());
        }
    }
}
