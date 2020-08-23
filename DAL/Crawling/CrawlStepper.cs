using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlStepper
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Enabled { get; set; }
        public TimeSpan RecuringTime { get; set; }
        public virtual ICollection<CrawlStep> CrawlSteps { get; set; }
        public int CrawlSourceId { get; set; }
        public virtual CrawlSource CrawlSource { get; set; }
    }
}
