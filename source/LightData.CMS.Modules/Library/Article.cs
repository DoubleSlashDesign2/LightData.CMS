using System.Collections.Generic;
using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;


namespace LightData.CMS.Modules.Library
{
    [Table("Articles")]
    public class Article : DbEntity
    {
        [NotNullable]
        public string ArticleName { get; set; }

        public List<MetaKeyword> MetaKeywords { get; set; }

        public bool Published { get; set; }

        [ForeignKey(typeof(Menus))]
        public long MenusId { get; set; }

        [IndependentData]
        public Menus Menus { get; set; }

        public List<ArticleNode> ArticleNodes { get; set; }

        [ForeignKey(typeof(Article))]
        public long? ArticleId { get; set; }

        // edited but not published yet
        public List<Article> ArticleTemp { get; set; }
    }
}
