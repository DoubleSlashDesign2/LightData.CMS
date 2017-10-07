using System.Web.Optimization;

namespace LightData.CMS
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/Styles/Layout.css", "~/Content/Styles/Layout.css")
                .Include("~/Content/Styles/jquery-ui.theme.css")
                .Include("~/Content/Styles/Errors.css")
                .Include("~/Content/Styles/HorizontalMenu.css")
                .Include("~/Content/Styles/VerticalMenu.css")
                .Include("~/Content/Styles/reset.css")
                .Include("~/Content/Styles/JqAutoFill.css")
                .Include("~/Content/Styles/Dialog.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Content/Script/jquery-3.2.1.min.js")
                .Include("~/Content/Script/jquery-ui.min.js")
                .Include("~/Content/Script/Plugins.js")
                .Include("~/Content/Script/HorizontalMenu.js")
                .Include("~/Content/Script/VerticalMenu.js")
                .Include("~/Content/Script/JqAutoFill.js")
                .Include("~/Content/Script/Dialog.js"));
        }
    }
}