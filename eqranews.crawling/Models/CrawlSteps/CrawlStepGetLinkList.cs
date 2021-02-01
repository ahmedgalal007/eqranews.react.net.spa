using AngleSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepGetLinkList : CrawlStep
    {
        public CrawlStepGetLinkList() : base() { }

        public CrawlStepGetLinkList(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            try
            {
                var document = await PageCrawler.GetPage(this.Url);
                var elements = document.QuerySelectorAll(this.Selector);
                // CrawlResult result = new CrawlResult();
                foreach (var elmnt in elements)
                {
                    CrawlResult result = new CrawlResult();
                    if (elmnt.GetAttribute("href") != null)
                        result.Url = new AngleSharp.Url(this.Url, elmnt.GetAttribute("href"));
                    if (result.Url != null && !results.Any(R => R.Url == result.Url))
                    {
                        result.Document = PageCrawler.GetPage(result.Url).Result;
                        //foreach (var item in this.CrawlItems)
                        //{
                        //    item.Value = elmnt.QuerySelector(item.Selector)?.InnerHtml;
                        //    result.CrawlItems.Add(item);
                        //}
                        results.Add(result);
                    }
                }
            }
            catch (Exception e)
            {

                throw e;
            }

            return results;
        }
    }
}
