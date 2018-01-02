using EntityWorker.Core.Transaction;
using System.Configuration;
using EntityWorker.Core.Helper;
using LightData.CMS.Modules.Library;
using System;

namespace LightData.CMS.Modules.Repository
{
    public class Repository : Transaction
    {
        public Repository() : base(GetConnectionString(), true, DataBaseTypes.Mssql) { }

        // get the full connection string from the web-config
        public static string GetConnectionString()
        {
            return @"Server=.\SQLEXPRESS; Database=CMS; User Id=root; Password=root;";
            //return ConfigurationManager.ConnectionStrings["Db-connection"].ConnectionString;
        }
    }
}
