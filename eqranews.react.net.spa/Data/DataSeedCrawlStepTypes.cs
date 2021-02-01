using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedCrawlStepTypes
    {
        public static void Seed(IServiceScope scope)
        {
            var _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var _types = new List<CrawlSetpType> {
                new CrawlSetpType {Name="CrawlStepGetLinkImgList" },
                new CrawlSetpType {Name="CrawlStepGetLinkList" },
                new CrawlSetpType {Name="CrawlStepParseLinkList"},
                new CrawlSetpType {Name="CrawlStepGetRssLinks" },
                new CrawlSetpType {Name="CrawlStepAssignCategories" },
            };
            foreach (var type in _types)
            {
                if (!_db.CrawlSetpTypes.Any(C => C.Name == type.Name))
                {
                    _db.CrawlSetpTypes.Add(type);
                };
            }
            _db.SaveChanges();
        }
    }
}
