using System.Collections.Generic;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Library
{
    public class Person : DbEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SureName { get; set; }

        public List<Address> Addresses { get; set; }
    }
}
