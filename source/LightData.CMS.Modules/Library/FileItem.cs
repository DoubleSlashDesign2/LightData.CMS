using System;
using System.Text;
using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;
using LightData.CMS.Modules.Helper;
using Newtonsoft.Json;

namespace LightData.CMS.Modules.Library
{
    [Table("FileItems")]
    public class FileItem : DbEntity
    {
        [ForeignKey(typeof(Folder))]
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
        [StringFy]
        public EnumHelper.AllowedFiles FileType { get; set; }

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

        private string _text;
        [ExcludeFromAbstract]
        public string Text
        {
            get
            {
                if (_text != null)
                    return _text;
                if (File != null && ( FileType == EnumHelper.AllowedFiles.CSS || FileType == EnumHelper.AllowedFiles.JAVASCRIPT))
                {
                    _text = Uri.EscapeDataString(Encoding.UTF8.GetString(File));
                }
                return _text;
            }
            set
            {
                _text = value;
            }
        }

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
