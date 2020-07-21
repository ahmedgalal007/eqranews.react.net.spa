using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models
{
    public class CrawlItem
    {
        public string Name { get; set; }
        public string Selector { get; set; }
        public string Value { get; set; }
        public string Attr { get; set; }
    }
}
