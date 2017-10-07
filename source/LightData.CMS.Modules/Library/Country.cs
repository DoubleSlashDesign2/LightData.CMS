using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    public class Country : DbEntity
    {
        public string Name { get; set; }

        public string CountryCode { get; set; }
    }
}
