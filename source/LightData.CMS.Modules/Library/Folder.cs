using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;
using System.Collections.Generic;

namespace LightData.CMS.Modules.Library
{
    [Table("Folders")]
    public class Folder : DbEntity
    {
        public string Name { get; set; }

        [ForeignKey(typeof(Folder))]
        public long? Parent_Id { get; set; }

        public List<Folder> Children { get; set; }

        public bool IsSystem { get; set; }
    }
}
