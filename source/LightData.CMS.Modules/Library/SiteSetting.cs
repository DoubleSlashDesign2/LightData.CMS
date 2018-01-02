using EntityWorker.Core.Object.Library;
using EntityWorker.Core.Attributes;

namespace LightData.CMS.Modules.Library
{
    public class SiteSetting : DbEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Value { get; set; }

        [StringFy]
        public Helper.EnumHelper.Keys Key { get; set; }

        [ForeignKey(typeof(SiteSettingCollection))]
        public long SiteSettingCollection_Id { get; set; }
    }
}
