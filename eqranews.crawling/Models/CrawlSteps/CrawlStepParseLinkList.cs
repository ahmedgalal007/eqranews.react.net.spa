﻿using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.crawling.Models.CrawlSteps
{
    public class CrawlStepParseLinkList : CrawlStep
    {
        public CrawlStepParseLinkList() : base()
        {
        }

        public CrawlStepParseLinkList(int Id, CrawlSetpType crawlSetpType, Url url, string Selector) : base(Id, crawlSetpType, url, Selector) { }

        public override async Task<List<CrawlResult>> Process(List<CrawlResult> results)
        {
            
            // CrawlResult result = new CrawlResult();
            foreach (var result in results)
            {
                foreach (var element in result.Document.QuerySelectorAll("script"))
                {
                    element.Remove();
                }
                foreach (var element in result.Document.QuerySelectorAll("ins"))
                {
                    element.Remove();
                }
                foreach (var element in result.Document.QuerySelectorAll("a"))
                {
                    element.Remove();
                }

                if (result.Url != null)
                {
                    
                    // result.Document = PageCrawler.GetPage(result.Url).Result;
                    // var elements = document.Result.QuerySelectorAll(this.Selector);
                    foreach (var item in this.CrawlItems)
                    {
                        var _newItem = new CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr };
                        if (string.IsNullOrWhiteSpace(_newItem.Attr))
                        {
                            _newItem.Value = result.Document.QuerySelector(_newItem.Selector)?.InnerHtml;
                        }
                        else
                        {
                            _newItem.Value = result.Document.QuerySelector(_newItem.Selector)?.GetAttribute(_newItem.Attr);
                        }

                        result.CrawlItems.Add(_newItem);
                    }
                    // results.Add(result);
                }
            }
            return results;
        }
    }
}
