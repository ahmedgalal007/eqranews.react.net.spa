using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Selector { get; set; }
        public string Value { get; set; }
        public string Attr { get; set; }

        public int CrawlStepId { get; set; }
        public virtual CrawlStep CrawlStep { get; set; }
    }
}
