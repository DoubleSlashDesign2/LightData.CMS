using Generic.LightDataTable;
using Generic.LightDataTable.InterFace;
using Generic.LightDataTable.Library;

namespace LightData.CMS.Modules.Migrations
{
    public class MigrationIni : Migration
    {
        public override void ExecuteMigration(ICustomRepository repository)
        {
            MethodHelper.GetClasses(this.GetType().Assembly).ForEach(repository.RemoveTable);
            MethodHelper.GetClasses(this.GetType().Assembly).ForEach(x => repository.CreateTable(x));
            base.ExecuteMigration(repository);
        }
    }
}
