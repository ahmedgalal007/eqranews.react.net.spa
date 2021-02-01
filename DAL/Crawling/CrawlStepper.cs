using DAL.Store;
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
        public bool InHome { get; set; }
        public bool InMenu { get; set; }
        public bool InMoreMenu { get; set; }
        public bool InTicker { get; set; }
        public bool InSlider { get; set; }

        public TimeSpan RecuringTime { get; set; }
        public string Description { get; set; }

        public virtual ICollection<CrawlStep> CrawlSteps { get; set; }

        public int CrawlSourceId { get; set; }
        public virtual CrawlSource CrawlSource { get; set; }

        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

    }
}
