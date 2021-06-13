using AngleSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace eqranews.crawling.Models.CrawlSteps
{
    public  class CrawlStepRemove:CrawlStep
    {
        public CrawlStepRemove() : base()
        {
        }

        public CrawlStepRemove(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            foreach (CrawlResult item in results)
            {
                foreach (var elem in item.Document.QuerySelectorAll(this.Selector))
                {
                    item.Document.RemoveChild(elem);
                }
                var content = item.CrawlItems.First(e => e.Name == "Content");
                 
            }

            return await base.Process(results);
        }
    }

}
