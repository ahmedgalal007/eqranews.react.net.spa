using DAL.Geo;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlSource
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string Domain { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<CrawlStepper> CrawlStepper { get; set; }
    }
}
