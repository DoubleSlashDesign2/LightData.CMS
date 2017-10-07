using Generic.LightDataTable.Attributes;

namespace LightData.CMS.Modules.Library
{
   public class ArticleTemp : Article
    {
        [ForeignKey(typeof(Article))]
        public long ArticleId { get; set; }

        public Article ParentArticle { get; set; }

    }
}
