using System.Collections.Generic;
using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    public class Menus : DbEntity
    {
        public string DisplayName { get; set; }

        public string Uri { get; set; }

        [ForeignKey(typeof(FileItem))]
        public long? IconId { get; set; }

        public FileItem Icon { get; set; }

        [ForeignKey(typeof(Menus))]
        public long? ParentId { get; set; }

        public List<Menus> Children { get; set; }
    }
}
