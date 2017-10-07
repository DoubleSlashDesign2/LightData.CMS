using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using LightData.Auth.Helper;
using LightData.Auth.Settings;

namespace LightData.Auth.Controllers
{
    [Authorize]
    public class SharedController : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(string userName, string password, bool isPersistent = true)
        {
            var user = AuthSettings.OnGetUser(userName, Methods.Encode(password)).FirstOrDefault();
            if (user == null)
                return View(0);
            FormsAuthentication.SetAuthCookie(user.UserName, isPersistent);
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }
    }
}