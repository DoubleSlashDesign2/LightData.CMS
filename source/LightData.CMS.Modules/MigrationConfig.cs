using System.Collections.Generic;
using Generic.LightDataTable.InterFace;
using Generic.LightDataTable.Library;
using LightData.CMS.Modules.Migrations;

namespace LightData.CMS.Modules
{
    public class MigrationConfig : IMigrationConfig
    {
        public IList<Migration> GetMigrations(ICustomRepository repository)
        {
            return new List<Migration>()
            {
                new MigrationIni(),
                new MigrationStartUp()
            };
        }
    }
}
