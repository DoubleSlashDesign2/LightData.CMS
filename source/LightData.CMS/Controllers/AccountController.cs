using System.Web.Mvc;
using LightData.Auth.Controllers;

namespace LightData.CMS.Controllers
{
    public class AccountController : SharedController
    {
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

    }
}