using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LightData.Auth.Helper
{
    public static class Extenstion
    {
        public static ExternalActionResult ToJsonResult(this object item)
        {
            return new ExternalActionResult(item);
        }
    }
}