using EntityWorker.Core.Helper;
using System.Collections;
using System.Text;
using System.Web.Mvc;
using static LightData.CMS.Modules.Helper.EnumHelper;

namespace LightDataTable.Site.Helpers
{
    public static class HtmlCustomHelper
    {
        public static MvcHtmlString Tag(this HtmlHelper htmlHelper, Tags tag, dynamic attributes = null)
        {
            var str = new StringBuilder();
            str.Append("<tag title='" + tag.ToString() + "' type='" + tag.ToString() + "'");
            string value = null;
            if (attributes != null)
            {
                var dic = attributes as IDictionary;
                foreach (var key in dic.Keys)
                {
                    if (tag == Tags.HtmlContent && string.Equals(key.ToString(), "value", System.StringComparison.CurrentCultureIgnoreCase))
                        value = dic[key]?.ConvertValue<string>();
                    str.Append(string.Format(" {0}='{1}'", key, dic[key]));
                }

            }
            if (value != null)
                str.Append(">" + value + " </tag>");
            else
                str.Append("> </tag>");
            return MvcHtmlString.Create(str.ToString());
        }
    }
}