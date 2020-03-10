using System.Data.Entity.Infrastructure;

namespace Logic.Database
{
    /// <summary>
    /// Factory for creation of DatabaseContext. Used by EntityFramework tools.
    /// See https://docs.microsoft.com/en-us/aspnet/core/data/entity-framework-6.
    /// </summary>
    public class DatabaseContextFactory : IDbContextFactory<DatabaseContext>
    {
        public DatabaseContext Create()
        {
            // TODO: Should not be hard coded
            return new DatabaseContext("Server=localhost\\SQLEXPRESS;Database=starter;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}
