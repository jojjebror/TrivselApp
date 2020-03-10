using Microsoft.VisualStudio.TestTools.UnitTesting;
using Logic.Services;
using Logic.Database;
using System.Threading.Tasks;

namespace Logic.Test.ServiceTests
{
    [TestClass]
    public class ExampleServiceTests
    {

        private ExampleService _exampleService;

        [TestInitialize]
        public void Inititalize()
        {
            var configuration = Utils.TestConfiguration.Create();
            _exampleService = new ExampleService(new DatabaseContext(configuration.GetSection("ConnectionStrings")["DefaultConnection"]));
        }

        [TestMethod]
        public async Task ShouldListExamples()
        {
            var examples = await _exampleService.List();

            Assert.IsNotNull(examples);
        }
    }
}
