﻿using System.Web.Optimization;

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
                .Include("~/Content/Styles/Dialog.css")
                .Include("~/Content/Styles/LightDataTableLoader.css")
                .Include("~/Content/Styles/ToolTip.css")
                .Include("~/Content/Styles/Articles.css")
                .Include("~/Content/Styles/CheckBox.css")
                .Include("~/Content/Styles/jquery-te-1.4.0.css")
                .Include("~/Content/HtmlEditorStyle/jHtmlArea.css")
                .Include("~/Content/HtmlEditorStyle/jHtmlArea.Editor.css")
                .Include("~/Content/Styles/Tabs.css"));

            //.Include("~/Content/HtmlEditorScript/jquery-ui-1.7.2.custom.min.js")
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Content/Script/jquery-3.2.1.min.js")
                .Include("~/Content/Script/jquery-ui.min.js")
                .Include("~/Content/Script/Plugins.js")
                .Include("~/Content/Script/HorizontalMenu.js")
                .Include("~/Content/Script/VerticalMenu.js")
                .Include("~/Content/Script/JqAutoFill.js")
                .Include("~/Content/Script/Dialog.js")
                .Include("~/Content/Script/LightDataTableAjax.js")
                .Include("~/Content/Script/loader.js")
                .Include("~/Content/Script/Menus.js")
                .Include("~/Content/Script/ToolTip.js")
                .Include("~/Content/Script/CheckBox.js")
                .Include("~/Content/Script/Articles.js")
                .Include("~/Content/Script/jquery-te-1.4.0.js")
                .Include("~/Content/HtmlEditorScript/jHtmlArea-0.8.js")
                .Include("~/Content/Script/Tabs.js"));
        }
    }
}