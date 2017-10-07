using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;
using LightData.CMS.Modules.Helper;

namespace LightData.CMS.Modules.Library
{
    [Table("Roles")]
   public class Role : DbEntity
    {
        public string Name { get; set; }

        public EnumHelper.RoleDefinition RoleDefinition { get; set; }
    }
}
