using LightData.Auth.Helper;
using LightData.CMS.Controllers.Base;
using LightData.CMS.Modules.Library;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Linq;

namespace LightData.CMS.Controllers
{
    public class SliderController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ExternalActionResult> Get()
        {
            var sliderCollection = await Repository.Get<SliderCollection>().LoadChildren().IgnoreChildren(x =>
            x.Sliders.Select(a => a.File.Folder),
            x => x.Sliders.Select(a => a.File.Slider),
            x => x.Sliders.Select(a => a.SliderCollection)).ExecuteAsync();
            return await sliderCollection.ToJsonResultAsync();
        }

        [HttpPost]
        public void Save(SliderCollection item)
        {
            Repository.Save(item);
            Repository.SaveChanges();
        }

        [HttpPost]
        public void Delete(long itemId)
        {
            var item = Repository.Get<SliderCollection>().Where(x => x.Id == itemId).IgnoreChildren(x => x.Sliders.Select(a => a.File), x => x.Sliders.Select(a => a.File.Slider), x => x.Sliders.Select(a => a.SliderCollection)).LoadChildren().Execute().First();
            Repository.Delete(item);
            Repository.SaveChanges();
        }

        [HttpPost]
        public void DeleteSlider(long itemId)
        {
            var item = Repository.Get<Slider>().Where(x => x.Id == itemId).IgnoreChildren(x => x.File, x => x.SliderCollection).LoadChildren().Execute().First();
            Repository.Delete(item);
            Repository.SaveChanges();
        }
    }
}