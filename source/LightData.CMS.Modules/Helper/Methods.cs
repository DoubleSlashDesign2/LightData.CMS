using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace LightData.CMS.Modules.Helper
{
    public static class Methods
    {
        public static string Encode(string password)
        {
            var hash = System.Security.Cryptography.SHA1.Create();
            var encoder = new System.Text.ASCIIEncoding();
            var combined = encoder.GetBytes(password ?? "");
            return BitConverter.ToString(hash.ComputeHash(combined)).ToLower().Replace("-", "");
        }

        public static List<RegionInfo> GetCountriesByIso3166()
        {
            var countries = new List<RegionInfo>();
            foreach (var culture in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
            {
                var country = new RegionInfo(culture.LCID);
                if (countries.All(p => p.Name != country.Name))
                    countries.Add(country);
            }
            return countries.OrderBy(p => p.EnglishName).ToList();
        }
    }
}