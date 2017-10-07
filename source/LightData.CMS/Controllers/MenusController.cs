using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Generic.LightDataTable;
using LightData.Auth.Helper;
using LightData.CMS.Modules.Library;
using LightData.CMS.Modules.Repository;

namespace LightData.CMS.Controllers
{
    public class MenusController : Controller
    {
        // GET: Menus
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ExternalActionResult GetMenus()
        {
            using (var rep = new Repository())
                return rep.Get<Menus>().LoadChildren().Where(x=> x.ParentId == null).Execute().ToJsonResult();
        }

        [HttpPost]
        public ExternalActionResult GetAutoFillData(string value)
        {
            using (var rep = new Repository())
            {
                return rep.Get<Menus>().LoadChildren()
                    .Where(x => x.DisplayName.Contains(value) || x.Children.Any(a => a.DisplayName.Contains(value)))
                    .Execute().ToJsonResult();
            }
        }

    }
}