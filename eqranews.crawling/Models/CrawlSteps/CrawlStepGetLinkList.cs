using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepGetLinkList: CrawlStep
    {
        public CrawlStepGetLinkList():base(){}

        public CrawlStepGetLinkList(int Id, CrawlSetpType crawlSetpType, Url url, string Selector):base(Id, crawlSetpType,url,Selector){}

        public override List<CrawlResult> Process(List<CrawlResult> results)
        {
            try
            {
                var document = PageCrawler.GetPage(this.Url);
                var elements = document.Result.QuerySelectorAll(this.Selector);
                // CrawlResult result = new CrawlResult();
                foreach (var elmnt in elements)
                {
                    CrawlResult result = new CrawlResult();
                    if (elmnt.GetAttribute("href") != null)
                        result.Url = new AngleSharp.Url(this.Url, elmnt.GetAttribute("href"));
                    //foreach (var item in this.CrawlItems)
                    //{
                    //    item.Value = elmnt.QuerySelector(item.Selector)?.InnerHtml;
                    //    result.CrawlItems.Add(item);
                    //}
                    results.Add(result);
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
