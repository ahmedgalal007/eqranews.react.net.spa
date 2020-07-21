using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models.CrawlSteps
{
    public abstract class CrawlStep
    {
        public CrawlStep()
        {
            CrawlItems = new List<CrawlItem>();
        }
        public CrawlStep(List<CrawlItem> crawlItems)
        {
            CrawlItems = crawlItems;
        }
        public int Id { get; set; }
        public Url Url { get; set; }
        public CrawlSetpType CrawlStepType { get; set; }
        public string Selector { get; set; }
        
        public string LoopSelector { get; set; }
        public string LoopsPagerSelector { get; set; }
        public int LoopsMax { get; set; }

        public List<CrawlItem> CrawlItems { get; set; }
        public object Inputs { get; set; }

        public virtual List<CrawlResult> Process(List<CrawlResult> results) {
            return results;
        }
    }

    public enum CrawlSetpType
    {
        Single,
        Loop
    }
}
