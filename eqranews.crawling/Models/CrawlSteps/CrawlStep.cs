using AngleSharp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public CrawlStep(int Id, CrawlSetpType crawlSetpType,Url url, string Selector )
        {
            CrawlItems = new List<CrawlItem>();
            this.Id = Id;
            this.CrawlStepType = crawlSetpType;
            this.Url = url;
            this.Selector = Selector;
        }
        public int Id { get; set; }
        public Url Url { get; set; }
        public CrawlSetpType CrawlStepType { get; set; }
        public string Selector { get; set; }
        public int StepOrder { get; set; }

        public string LoopSelector { get; set; }
        public string LoopsPagerSelector { get; set; }
        public int LoopsMax { get; set; }

        public List<CrawlItem> CrawlItems { get; set; }
        public object Inputs { get; set; }

        public virtual async Task<List<CrawlResult>> Process(List<CrawlResult> results) {
            return results;
        }
    }

    public enum CrawlSetpType
    {
        Single,
        Loop
    }
}
