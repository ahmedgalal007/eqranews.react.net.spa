using Xunit;
using eqranews.crawling.Models;
using System;
using System.Collections.Generic;
using System.Text;
using eqranews.crawling.Models.CrawlSteps;

namespace eqranews.crawling.Models.Tests
{
    public class CrawlStepperTests
    {
        public CrawlStepperTests()
        {
            
        }

        [Fact()]
        public void CrawlStepGetLinkListTest()
        {
            // Arrange
            var stepper = new CrawlStepper();
            stepper.StepSequence.Add(new CrawlStepGetLinkList(1, CrawlSetpType.Single,
                new AngleSharp.Url("http://gate.ahram.org.eg/index.aspx"),
                "#ContentPlaceHolder1_divUrgent .blok_file > a"
            ));
            // Act
            var res = stepper.Crawl().Result;
            // Assert
            Assert.True(res.Count > 0, "This test needs an implementation");
        }
        [Fact()]
        public void CrawlStepParseLinkListTest()
        {
            // Arrange
            var stepper = new CrawlStepper();
            stepper.StepSequence.Add(new CrawlStepGetLinkList(
                1, CrawlSetpType.Single, new AngleSharp.Url("http://gate.ahram.org.eg/index.aspx"),"#ContentPlaceHolder1_divUrgent .blok_file > a"
            ));
            stepper.StepSequence.Add(new CrawlStepParseLinkList{ 
                Id = 2,
                CrawlItems = new List<CrawlItem>
                {
                    new CrawlItem{ Name="Title", Selector="Title"},
                    new CrawlItem{ Name="Image", Selector="#ContentPlaceHolder1_divMainImage > img", Attr="src"}
                }
            });
            // Act
            var res = stepper.Crawl().Result;
            // Assert
            Assert.True(res.Count > 0, "This test needs an implementation");
        }


        [Fact()]
        public void CrawlStepGetRssLinksTest()
        {
            // Arrange
            var stepper = new CrawlStepper();
            stepper.StepSequence.Add(new CrawlStepGetRssLinks()
            {
                Id = 1,
                CrawlStepType = CrawlSetpType.Single,
                Url = new AngleSharp.Url("https://www.almasryalyoum.com/rss/rssfeeds"),
                Selector = "//rss/channel/item/link/text()"
            });
            stepper.StepSequence.Add(new CrawlStepParseLinkList
            {
                Id = 2,
                CrawlItems = new List<CrawlItem>
                {
                    new CrawlItem{ Name="Title", Selector="Title"},
                    new CrawlItem{ Name="Image", Selector=".article .articleimg > img", Attr="src"}
                }
            });
            // Act
            var res = stepper.Crawl().Result;
            // Assert
            //Assert.True(String.IsNullOrEmpty(res[0]?.CrawlItems[0]?.Value) , "Title Crawling fail for El masry Elyom ");
            //Assert.True(String.IsNullOrEmpty(res[0]?.CrawlItems[1]?.Value), "Image Crawling fail for El masry Elyom ");
            Assert.True(res.Count > 0, "This test needs an implementation");
        }
    }
}