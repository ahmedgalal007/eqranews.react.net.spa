using DAL.Crawling;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Geo
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IsoCode { get; set; }

        public virtual ICollection<CrawlSource> CrawlSources { get; set; }
    }
}
