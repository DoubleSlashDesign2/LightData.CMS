using LightData.CMS.Modules.Library;
using System.Collections.Generic;

namespace LightData.Auth.Settings
{
    public static class AuthSettings
    {

        public delegate List<dynamic> Getuser(string username, string password);

        public static Getuser OnGetUser;

        public delegate List<FileItem> GetFileItem(long fileId);

        public static GetFileItem GetFileById;
    }
}