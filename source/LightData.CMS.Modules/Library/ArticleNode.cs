using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class ArticleNode : DbEntity
    {
        public long ArticleId { get; set; }

        public string PageHeader { get; set; }

        [ToBase64String]
        public string Content { get; set; }

        public string Tags { get; set; }

        /// <summary>
        /// Language
        /// </summary>
        [ForeignKey(typeof(Country))]
        public long LanguageId { get; set; }

        public Country Language { get; set; }
    }
}
