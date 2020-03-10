using Microsoft.Extensions.Configuration;
using System.IO;

namespace Logic.Test.Utils
{
    public class TestConfiguration
    {

        public static IConfigurationRoot Create()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            IConfigurationRoot configuration = builder.Build();

            return configuration;
        }

    }
}
