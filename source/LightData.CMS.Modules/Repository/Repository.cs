using Generic.LightDataTable.Transaction;

namespace LightData.CMS.Modules.Repository
{
    public class Repository : TransactionLiteData
    {
        public Repository() : base("Db-connection", true) { }
    }
}
