using AngleSharp;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace eqranews.crawling.Models.CrawlSteps
{
    public  class CrawlStepConvertHtmlToText : CrawlStep
    {
        public CrawlStepConvertHtmlToText() : base()
        {
        }

        public CrawlStepConvertHtmlToText(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            // Javascript Array of Crawl items names ex ['Title','Content']
            List<string> TextNodes = JsonConvert.DeserializeObject<List<string>>(this.Selector);
            foreach (CrawlResult item in results)
            {
                if(item.CrawlItems.Where(e => TextNodes.Contains(e.Name)).Count() > 0)
                {
                    item.CrawlItems.Where(e => TextNodes.Contains(e.Name)).ToList().ForEach(e => {
                        var Doc = new XmlDocument();
                        var elem = Doc.CreateNode("p", "tempNode","");
                        elem.InnerXml = e.Value;
                        e.Value = elem.InnerText;
                    });
                }
            }

            return await base.Process(results);
        }
    }

}
