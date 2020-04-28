namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class imageDrink : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Drinks", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Drinks", "Image");
        }
    }
}
