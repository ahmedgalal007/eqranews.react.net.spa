using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Services
{
    public class UtilService : IUtilService
    {
        public string renderImage(string url, string alt = "", int emptyHeight=160)
        {
            if (string.IsNullOrWhiteSpace(url))
            {

                return $"<div class=\"empty-img\" style=\"height:{emptyHeight}px;\" ></div> \n\r";
            }

            return $"<img src=\"{url}\" alt=\"{alt}\" /> \n\r";
        }
    }
}
