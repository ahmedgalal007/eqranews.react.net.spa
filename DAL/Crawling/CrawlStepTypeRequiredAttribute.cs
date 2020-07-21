using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlStepTypeRequiredAttribute
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TypeName { get; set; }
        public string DefaultValue { get; set; }
        public bool Required { get; set; }
    }
}
