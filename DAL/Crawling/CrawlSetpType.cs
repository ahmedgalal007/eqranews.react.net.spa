using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Crawling
{
    public class CrawlSetpType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CrawlStep> CrawlSteps { get; set; }
    }

        //CrawlStepGetLinkList,
        //CrawlStepGetRssLinks,
        //CrawlStepParseLinkList
}
