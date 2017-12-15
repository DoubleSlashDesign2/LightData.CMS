using System.Collections.Generic;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class Country : DbEntity
    {
        public string Name { get; set; }

        public string CountryCode { get; set; }

        public List<Cities> Cities { get; set; }

        public bool Visible { get; set; }
    }
}
