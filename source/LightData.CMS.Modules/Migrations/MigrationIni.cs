using EntityWorker.Core.Helper;
using EntityWorker.Core.InterFace;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Migrations
{
    public class MigrationIni : Migration
    {
        public override void ExecuteMigration(IRepository repository)
        {
            
            MethodHelper.GetDbEntitys(this.GetType().Assembly).ForEach(repository.RemoveTable);
            MethodHelper.GetDbEntitys(this.GetType().Assembly).ForEach(x => repository.CreateTable(x));
            base.ExecuteMigration(repository);
            repository.SaveChanges();
        }
    }
}
