namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCredit : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Credit", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Credit");
        }
    }
}
