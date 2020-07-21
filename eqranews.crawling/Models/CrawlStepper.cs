using eqranews.crawling.Models.CrawlSteps;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace eqranews.crawling.Models
{
    public class CrawlStepper
    {
        public CrawlStepper()
        {
            StepSequence = new List<CrawlStep>();
        }
        public List<CrawlStep> StepSequence { get; set; }
        public List<CrawlResult> _crawlResults = new List<CrawlResult>();
        public List<CrawlResult> Crawl()
        {

            foreach (CrawlStep step in StepSequence)
            {
                // if(step.CrawlStepType == CrawlSetpType.Loop){}
                _crawlResults = step.Process(_crawlResults);
            }

            return _crawlResults;
        }

    }
}
