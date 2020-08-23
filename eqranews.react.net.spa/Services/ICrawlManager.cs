using eqranews.react.net.spa.Data;
using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Services
{
    public interface ICrawlManager
    {
        abstract void CreateEnabledSourcesJobs(IApplicationBuilder app);

    }
}
