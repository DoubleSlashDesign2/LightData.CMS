using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class Cities : DbEntity
    {
        public string Name { get; set; }

        public string ShortName { get; set; }
            
        [ForeignKey(typeof(Country))]
        public long CountryId { get; set; }
    }
}
