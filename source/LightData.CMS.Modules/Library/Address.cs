using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class Address : DbEntity
    {
        [NotNullable]
        public string Name { get; set; }

        [ForeignKey(typeof(Country))]
        public long CountryId { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string TownOrCity { get; set; }

        public string PostalCode { get; set; }

        public string Area { get; set; }

        public Country Country { get; set; }

        [ForeignKey(typeof(Person))]
        public long PersonId { get; set; }
    }
}
