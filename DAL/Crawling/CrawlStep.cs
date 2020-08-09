using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlStep
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int CrawlStepTypeId { get; set; }
        public virtual CrawlSetpType CrawlStepType { get; set; }
        public string Selector { get; set; }

        public string LoopSelector { get; set; }
        public string LoopsPagerSelector { get; set; }
        public int LoopsMax { get; set; }
        public virtual ICollection<CrawlItem> CrawlItems { get; set; }
        public int CrawlStepperId { get; set; }
        public virtual CrawlStepper CrawlStepper { get; set; }

    }
}
