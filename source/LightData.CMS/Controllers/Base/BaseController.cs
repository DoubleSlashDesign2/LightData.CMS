using LightData.Auth.Controllers;
using LightData.Auth.Helper;
using LightData.CMS.Modules.Interface;
using LightData.CMS.Modules.Library;
using LightData.CMS.Modules.Library.Internal;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace LightData.CMS.Controllers.Base
{
    public class BaseController : SharedController
    {
        private IEntityWorkerRepository _repository;

        protected IEntityWorkerRepository Repository
        {
            get
            {
                if (_repository == null)
                    _repository = new EntityWorkerRepository();
                return _repository;
            }
        }

        [HttpPost]
        public ExternalActionResult GetActiveCountries()
        {
            return Repository.Repository.Get<Country>().Where(x => x.Visible == true).Execute().ToJsonResult();
        }

        [HttpPost]
        public async Task<ExternalActionResult> GetCountries(string filter)
        {
            var countries = await Repository.Repository.Get<Country>().Where(x => string.IsNullOrEmpty(filter) || filter.Contains(x.Name)).ExecuteAsync();

            return await countries.ToJsonResultAsync();
        }

        [HttpPost]
        public void SaveCountry(Country country)
        {
            Repository.Repository.Save(country);
        }
    }
}