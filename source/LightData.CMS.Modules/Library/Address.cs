using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    public class Address : DbEntity
    {
        public string Name { get; set; }

        [ForeignKey(typeof(Country))]
        public long CountryId { get; set; }

        public Country Country { get; set; }

        [ForeignKey(typeof(Person))]
        public long PersonId { get; set; }
    }
}
