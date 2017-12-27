using System;
using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;
using Newtonsoft.Json;

namespace LightData.CMS.Modules.Library
{
    [Table("FileItems")]
    public class FileItem : DbEntity
    {
        [ForeignKey(typeof(Folder), "Folder")]
        public long Folder_Id { get; set; }

        [IndependentData]
        public Folder Folder { get; set; }

        /// <summary>
        /// Path to image on disk
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// PDF, PNG, JPG....
        /// </summary>
        public string FileType { get; set; }

        /// <summary>
        /// File content
        /// </summary>
        [JsonIgnore]
        public byte[] File { get; set; }

        [JsonIgnore]
        public byte[] ThumpFile { get; set; }

        /// <summary>
        /// Bytes Length
        /// </summary>
        public int Length { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public string Alt { get; set; }

        public string Title { get; set; }

        public string BorderColor { get; set; }

        public int BorderWidth { get; set; }

        /// <summary>
        /// load file as 64bytes
        /// </summary>
        /// <returns></returns>
        [ExcludeFromAbstract]
        public string Base64ThumpFile
        {
            get
            {
                return ThumpFile != null ? Convert.ToBase64String(ThumpFile) : null;
            }
        }

        /// <summary>
        /// load file as 64bytes
        /// </summary>
        /// <returns></returns>
        [ExcludeFromAbstract]
        public string Base64File
        {
            get
            {
                return File != null ? Convert.ToBase64String(File) : null;
            }
        }
    }
}
