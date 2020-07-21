using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlStepper
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public virtual ICollection<CrawlStep> CrawlSteps { get; set; }
        public int CrawlSourcId { get; set; }
        public virtual CrawlSource CrawlSource { get; set; }
    }
}
