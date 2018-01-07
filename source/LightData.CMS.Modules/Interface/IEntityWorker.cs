using EntityWorker.Core.InterFace;
using System;


namespace LightData.CMS.Modules.Interface
{
    public interface IEntityWorkerRepository : IDisposable
    {
        IRepository Repository { get; }

        T ConvertValue<T>(object itemToConvert);
    }
}
