using System.Collections.Generic;
using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class Menus : DbEntity
    {
        [NotNullable]

        public string DisplayName { get; set; }

        [ForeignKey(typeof(Menus))]
        public long? ParentId { get; set; }

        public List<Menus> Children { get; set; }

        [NotNullable]
        public string Uri { get; set; }

        [ForeignKey(typeof(FileItem))]
        public long? IconId { get; set; }

        public FileItem Icon { get; set; }

        public bool Publish { get; set; }

        public string Description { get; set; }

        [ForeignKey(typeof(User))]
        public long? CreatedBy { get; set; }

        public User CreatedByUser { get; set; }
    }
}
