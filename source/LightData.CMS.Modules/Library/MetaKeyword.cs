using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    [Table("MetaKeywords")]
    public class MetaKeyword : DbEntity
    {
        public string Key { get; set; }

        public string Description { get; set; }

        [ForeignKey(typeof(Article))]
        public long ArticleId { get; set; }

    }
}
