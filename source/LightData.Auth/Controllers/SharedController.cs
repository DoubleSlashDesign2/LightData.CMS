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

        protected const int SearchResultValue = 20;
        [AllowAnonymous]
        public ActionResult Login()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");
            return View();
        }


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

        [HttpPost]
        public void SetValue(string key, object value)
        {
            value.SessionSet(key);
        }

        [HttpPost]
        public ExternalActionResult GetValue(string key)
        {
            return key.SessionGet().ToJsonResult();
        }
    }
}