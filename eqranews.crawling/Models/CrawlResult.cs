using AngleSharp;
using eqranews.crawling.Models.CrawlSteps;
using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models
{
    public class CrawlResult
    {
        public CrawlResult()
        {
            CrawlItems = new List<CrawlItem>();
        }
        public List<CrawlItem> CrawlItems { get; set; }
        public Url Url { get; set; }
        public List<int> Categories { get; set; }
        //public CrawlSetpType CrawlSetpType { get; set; }
        public CrawlStep LastCrawlStep { get; set; }
    }
}
