using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;
using LightData.CMS.Modules.Helper;

namespace LightData.CMS.Modules.Library
{
    [Table("Roles")]
   public class Role : DbEntity
    {
        [NotNullable]
        public string Name { get; set; }

        [StringFy]
        public EnumHelper.RoleDefinition RoleDefinition { get; set; }
    }
}
