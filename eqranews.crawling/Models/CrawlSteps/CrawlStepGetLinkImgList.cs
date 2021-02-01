using AngleSharp;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepGetLinkImgList : CrawlStep
    {
        public CrawlStepGetLinkImgList():base(){}

        public CrawlStepGetLinkImgList(int Id, CrawlSetpType crawlSetpType, Url url, string Selector):base(Id, crawlSetpType,url,Selector){}

        public  override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            try
            {
                // List<string> _selectors = this.Selector.Split(';').ToList();
                JsonSelector _JSelector = JsonConvert.DeserializeObject<JsonSelector>(this.Selector);
                var document = await PageCrawler.GetPage(this.Url);
                var elements = document.QuerySelectorAll(_JSelector.Container);
                // CrawlResult result = new CrawlResult();
                foreach (var elmnt in elements)
                {
                    CrawlResult result = new CrawlResult();
                    var _url = elmnt.QuerySelector(_JSelector.Url);
                    if (_url != null && _url.GetAttribute("href") != null)
                        result.Url = new AngleSharp.Url(this.Url, _url.GetAttribute("href"));
                    var _thumb = elmnt.QuerySelector(_JSelector.Thumb);
                    if (_thumb != null && _thumb.GetAttribute(_JSelector.ImageAttr) != null)
                        result.Thumb = new AngleSharp.Url(this.Url, _thumb.GetAttribute(_JSelector.ImageAttr));
                    

                    if (result.Url != null && !results.Any(R=> R.Url == result.Url))
                    {
                        // Load result Document
                        result.Document = await PageCrawler.GetPage(result.Url);
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

        private class JsonSelector
        {
            public string Container { get; set; }
            public string Url { get; set; }
            public string Thumb { get; set; }
            public string ImageAttr { get; set; }

        }
    }
}
