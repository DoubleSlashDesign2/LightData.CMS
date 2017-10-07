using System;
using System.IO;
using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    [Table("FileItems")]
    public class FileItem : DbEntity
    {
        public string Title { get; set; }

        /// <summary>
        /// Path to image on disk
        /// </summary>
        public string LocalUrl { get; set; }

        /// <summary>
        /// PDF, PNG, JPG....
        /// </summary>
        public string FileType { get; set; }

        /// <summary>
        /// Load the File
        /// </summary>
        /// <returns></returns>
        public byte[] LoadFile()
        {
            return File.Exists(LocalUrl) ? File.ReadAllBytes(LocalUrl) : null;
        }

        /// <summary>
        /// load file as 64bytes
        /// </summary>
        /// <returns></returns>
        public string Load64File()
        {
            var file = LoadFile();
            return file != null ? Convert.ToBase64String(file) : string.Empty;
        }
    }
}
