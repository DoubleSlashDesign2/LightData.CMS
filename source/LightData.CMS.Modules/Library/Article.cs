using System.Collections.Generic;
using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    [Table("Articles")]
    public class Article : DbEntity
    {
        public string ArticleName { get; set; }

        public List<MetaKeyword> MetaKeywords { get; set; }

        public bool Published { get; set; }

        [ForeignKey(typeof(Menus))]
        public long MenusId { get; set; }

        public List<ArticleNode> ArticleNodes { get; set; }

        public ArticleTemp ArticleTemp { get; set; }
    }
}
