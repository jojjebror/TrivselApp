using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Options
{
    public class AuthenticationOptions
    {
        public AppOptions App { get; set; }
        public ApiOptions Api { get; set; }
        public ExternalOptions External { get; set; }
    }

    public class AppOptions
    {
        public string Url { get; set; }
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string RedirectUrl { get; set; }
        public string LogoutRedirectUrl { get; set; }
    }

    public class ApiOptions
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }

    public class ExternalOptions {
        public GoogleOptions Google { get; set; }
    }

    public class GoogleOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}
