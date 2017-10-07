using Generic.LightDataTable.Attributes;

namespace LightData.CMS.Modules.Library
{
    [Table("MetaKeywords")]
    public class MetaKeyword
    {
        public string Key { get; set; }

        public string Description { get; set; }

        [ForeignKey(typeof(Article))]
        public long ArticleId { get; set; }

    }
}
