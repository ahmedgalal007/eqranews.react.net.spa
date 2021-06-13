using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Services
{
    public interface IUtilService
    {
        public string renderImage(string url, string alt = "", int emptyHeight = 160);
    }
}
