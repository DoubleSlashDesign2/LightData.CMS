using EntityWorker.Core.Attributes;
using EntityWorker.Core.Object.Library;

namespace LightData.CMS.Modules.Library
{
    public class Slider : DbEntity
    {
        [ForeignKey(typeof(FileItem))]
        public long FileItem_Id { get; set; }

        [ForeignKey(typeof(SliderCollection))]
        public long SliderCollection_Id { get; set; }

        [IndependentData]
        public SliderCollection SliderCollection { get; set; }

        [IndependentData]
        public FileItem File { get; set; }
    }
}
