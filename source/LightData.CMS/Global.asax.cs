using System.Linq;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using LightData.Auth.Settings;
using Generic.LightDataTable;
using LightData.CMS.Modules.Library;
using LightData.CMS.Modules.Repository;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace LightData.CMS
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
      
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthSettings.OnGetUser += (username, password) =>
            {
                using (var rep = new Repository())
                    return rep.Get<User>().Where(x => x.UserName == username && x.Password == password)
                        .LoadChildren(x => x.Role).Execute().Cast<dynamic>().ToList();
            };

        }
    }
}
