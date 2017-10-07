using Generic.LightDataTable.Attributes;
using Generic.LightDataTable.Library;


namespace LightData.CMS.Modules.Library
{
    [Table("Users")]
    public class User : DbEntity
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        [ForeignKey(typeof(Role))]
        public long RoleId { get; set; }

        [IndependentData]
        public Role Role { get; set; }

        [ForeignKey(typeof(Person))]
        public long PersonId { get; set; }

        public Person Person { get; set; }
    }
}
