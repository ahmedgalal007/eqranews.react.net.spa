using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models
{
    public class Source
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Country { get; set; }
        public CrawlStepper CrawlStepper { get; set; }
    }
}
