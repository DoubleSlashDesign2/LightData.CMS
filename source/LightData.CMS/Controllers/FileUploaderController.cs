using LightData.CMS.Controllers.Base;
using LightData.CMS.Modules.Library;
using System.IO;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using System.Threading.Tasks;
using LightData.Auth.Helper;
using System.Collections.Generic;
using EntityWorker.Core.Helper;
using System;

namespace LightData.CMS.Controllers
{
    public class FileUploaderController : BaseController
    {

        [HttpGet]
        public ActionResult GetImage(long id)
        {
            var image = Repository.Get<FileItem>().Where(x => x.Id == id).Execute().First();
            return new FileStreamResult(new System.IO.MemoryStream(image.File), "image/" + image.FileType);
        }

        [HttpPost]
        public async Task<ExternalActionResult> GetFolders()
        {
            var folders = await Repository.Get<Folder>().Where(x => x.Parent_Id == null).LoadChildren().ExecuteAsync();
            return await folders.ToJsonResultAsync();
        }

        [HttpPost]
        public void SaveFolder(Folder folder)
        {
            if (folder != null)
                Repository.Save(folder);
            Repository.SaveChanges();
        }

        [HttpPost]
        public void DeleteFolder(long folderId)
        {
            Repository.Get<Folder>().Where(x => x.Id == folderId).LoadChildren().Execute().ForEach(x => Repository.Delete(x));
            Repository.SaveChanges();
        }

        [HttpPost]
        public async Task<ExternalActionResult> Get(int pageNr, long folderId)
        {
            var files = await Repository.Get<FileItem>().Where(x => x.Folder_Id == folderId).Skip((pageNr - 1) * SearchResultValue).Take(SearchResultValue).OrderBy(x => x.FileName).LoadChildren(x => x.Folder).ExecuteAsync();

            return await files.ToJsonResultAsync();
        }

        [HttpPost]
        public void Delete(List<long> items)
        {
            items.ForEach(a => Repository.Get<FileItem>().LoadChildren().Where(x => x.Id == a).Remove());
            Repository.SaveChanges();
        }

        [HttpPost]
        public void SaveFileItem(FileItem file)
        {
            var id = file.Id;
            var item = Repository.Get<FileItem>().Where(x => x.Id == id).Execute().First();
            item.FileName = file.FileName;
            Repository.Save(item);
            Repository.SaveChanges();
        }

        [HttpPost]
        public void Save()
        {
            var fileItems = Repository.Get<FileItem>();
            string FileName = "";
            var folderId = Request.Form["folderId"];
            HttpFileCollectionBase files = Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFileBase file = files[i];
                string fname;

                // Checking for Internet Explorer    
                if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                    fname = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fname = file.FileName;
                    FileName = file.FileName;
                }


                using (var mem = new MemoryStream())
                {

                    file.InputStream.CopyTo(mem);
                    System.Drawing.Image fullsizeImage = System.Drawing.Image.FromStream(mem);
                    System.Drawing.Image newImage = fullsizeImage.GetThumbnailImage(32, 32, null, IntPtr.Zero);
                    using (var imgMem = new MemoryStream())
                    {
                        newImage.Save(imgMem, System.Drawing.Imaging.ImageFormat.Png);
                        fileItems.Add(new FileItem()
                        {
                            File = mem.ToArray(),
                            Length = file.ContentLength,
                            FileType = file.FileName.Split('.').ToList().Last().ToLower(),
                            FileName = fname,
                            Folder_Id = folderId.ConvertValue<long>(),
                            ThumpFile = imgMem.ToArray(),
                            Width = fullsizeImage.Width,
                            Height = fullsizeImage.Height
                        });
                    }
                }
            }
            fileItems.Save();
            fileItems.SaveChanges();
        }

    }
}