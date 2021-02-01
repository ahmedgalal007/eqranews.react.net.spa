using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Data
{
    public interface IDAL
    {
        public DbNews GetNews();
    }
}
