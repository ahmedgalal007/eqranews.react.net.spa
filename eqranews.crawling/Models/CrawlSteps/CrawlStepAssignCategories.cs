using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepAssignCategories : CrawlStep
    {
        public CrawlStepAssignCategories() : base() { }

        public CrawlStepAssignCategories(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            // CrawlResult result = new CrawlResult();
            foreach (var result in results)
            {
                // var document = PageCrawler.GetPage(result.Url).Result;
                // var elements = document.Result.QuerySelectorAll(this.Selector);
                foreach (var item in this.CrawlItems)
                {
                    // var _newItem = new CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr };
                    int CategoryId = 0;
                    if (int.TryParse(item.Value, out CategoryId))
                        result.Categories.Add(CategoryId);
                }
                // results.Add(result);
            }
            return results;
        }
    }
}
