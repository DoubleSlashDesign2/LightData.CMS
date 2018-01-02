using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;
using Newtonsoft.Json;
using System.Collections.Generic;
using static LightData.CMS.Modules.Helper.EnumHelper;

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

        [StringFy]
        public FolderTypes FolderType { get; set; }

        [JsonIgnore]
        public List<FileItem> Files { get; set; }

        public bool IsActive { get; set; }
    }
}
