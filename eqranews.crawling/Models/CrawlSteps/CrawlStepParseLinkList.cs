using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepParseLinkList : CrawlStep
    {
        public override List<CrawlResult> Process(List<CrawlResult> results)
        {
            
            // CrawlResult result = new CrawlResult();
            foreach (var result in results)
            {
                var document = PageCrawler.GetPage(result.Url).Result;
                // var elements = document.Result.QuerySelectorAll(this.Selector);
                foreach (var item in this.CrawlItems)
                {
                    var _newItem = new CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr };
                    if (string.IsNullOrWhiteSpace(_newItem.Attr))
                    {
                        _newItem.Value = document.QuerySelector(_newItem.Selector)?.InnerHtml;
                    }
                    else
                    {
                        _newItem.Value = document.QuerySelector(_newItem.Selector)?.GetAttribute(_newItem.Attr);
                    }
                    
                    result.CrawlItems.Add(_newItem);
                }
                // results.Add(result);
            }
            return results;
        }
    }
}
