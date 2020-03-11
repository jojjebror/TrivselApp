namespace Logic.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class drinks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Drinks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductNameBold = c.String(),
                        ProductId = c.String(),
                        Category = c.String(),
                        AlcoholPercentage = c.Double(nullable: false),
                        Volume = c.Double(nullable: false),
                        Price = c.Double(nullable: false),
                        Usage = c.String(),
                        Taste = c.String(),
                        BeverageDescriptionShort = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Drinks");
        }
    }
}
