using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using eqranews.react.net.spa.Migrations;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedSteps
    {
        private static ApplicationDbContext _db;
        public static void Seed(IServiceScope scope)
        {
            _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var _okaz = new List<List<string>>{
                new List<string> {"عكاظ", "سياسة", "https://www.okaz.com.sa/morearticles/news/politics", "ul.search-results > li > div > a", "article > header > div > h1", "#lightgallery > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText"},
                new List<string> {"عكاظ", "رياضة", "https://www.okaz.com.sa/sports", "div.slider.slider-tertiary > div > aside > ul > li > a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText"  },
                new List<string> {"عكاظ", "إقتصاد", "https://www.okaz.com.sa/economy", "div.slider.slider-tertiary > div > aside > ul > li > a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText" },
                new List<string> {"عكاظ", "فنون", "https://www.okaz.com.sa/culture", ".slider.slider-news.slider-news-secondary div.slider-inner div.slide a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText" },
                new List<string> {"عكاظ", "منوعات", "https://www.okaz.com.sa/variety", "div.slider.slider-tertiary > div > aside > ul > li > a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText" },
                new List<string> {"عكاظ", "تكنولوجيا", "https://www.okaz.com.sa/technology", "div.slider.slider-tertiary > div > aside > ul > li > a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText" },
                new List<string> {"عكاظ", "تحقيقات", "https://www.okaz.com.sa/investigation",  "div.slider.slider-tertiary > div > aside > ul > li > a", "article > header > div > h1", "#lightgallery  figure:first-child > div > div > img", "article > div.article-body > div > div > div > div.article-entry > div.bodyText" },
            };
            GenerateSteps(Conf: _okaz);

            var _almadina = new List<List<string>>{
                new List<string> {"المدينة", "سياسة", "https://www.al-madina.com/%D9%85%D8%AD%D9%84%D9%8A%D8%A7%D8%AA", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "رياضة", "https://www.al-madina.com/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "إقتصاد", "https://www.al-madina.com/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "صحة وجمال", "https://www.al-madina.com/%D8%B5%D8%AD%D8%A9", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "منوعات", "https://www.al-madina.com/%D8%BA%D8%B1%D8%A7%D8%A6%D8%A8", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "تكنولوجيا", "https://www.al-madina.com/%D8%AA%D9%82%D9%86%D9%8A%D8%A9", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "تحقيقات", "https://www.al-madina.com/%D9%85%D9%86%D8%AA%D8%AF%D9%89", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},
                new List<string> {"المدينة", "فكر وثقافة", "https://www.al-madina.com/%D8%AB%D9%82%D8%A7%D9%81%D8%A9", ".sectionArticles .lower a", "div.titleArticle h1", "div.imgArticle img", "div.articleBody"},

            };
            GenerateSteps(Conf: _almadina);

            var _emaritesToday = new List<List<string>>{
                new List<string> {"الإمارات اليوم", "سياسة", "https://www.emaratalyoum.com/politics", ".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "رياضة", "https://www.emaratalyoum.com/sports",".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "إقتصاد", "https://www.emaratalyoum.com/business",".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "صحة وجمال", "https://www.emaratalyoum.com/fashion-and-beauty", ".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "منوعات", "https://www.emaratalyoum.com/politics/international", ".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "تكنولوجيا", "https://www.emaratalyoum.com/technology", ".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "تحقيقات", "https://www.emaratalyoum.com/politics/reports-and-translation", ".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "فكر وثقافة", "https://www.emaratalyoum.com/life/culture",".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "حوادث", "https://www.emaratalyoum.com/local-section/accidents",".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
                new List<string> {"الإمارات اليوم", "فنون", "https://www.emaratalyoum.com/life/cinema",".maincontent ul > li > article a", "#mainarea > h1.title", ".slick-slider.slick-initialized .slick-list li:nth-child(1) img", "#articledetails"},
            };
            GenerateSteps(Conf: _emaritesToday);

            var _AlBayan = new List<List<string>>{
                new List<string> {"البيان", "سياسة", "https://www.albayan.ae/one-world/political-issues", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "رياضة", "https://www.albayan.ae/sports", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "إقتصاد", "https://www.albayan.ae/economy", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "صحة وجمال", "https://www.albayan.ae/health", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "منوعات", "https://www.albayan.ae/across-the-uae", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "تكنولوجيا", "https://www.albayan.ae/across-the-uae/sciences", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "تحقيقات", "https://www.albayan.ae/across-the-uae/interviews-dialogues", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "فكر وثقافة", "https://www.albayan.ae/five-senses/culture", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "حوادث", "https://www.albayan.ae/across-the-uae/accidents", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
                new List<string> {"البيان", "فنون", "https://www.albayan.ae/five-senses/cinema", "#mainarea > div > ul > li article h3 > a;#mainarea > div > ul > li article figure  img", "div.articledetails article h1", "div.articledetails figure img", "#articledetails"},
            };
            GenerateSteps(Conf: _AlBayan);


        }

        private static void GenerateSteps(List<List<string>> Conf)
        {

            foreach (var item in Conf)
            {
                var stepperName = item[0] + "_" + item[1];
                var stepperId = _db.CrawlSteppers.Where(S => S.Name == stepperName).First().Id;
                var stepType_1_Id = _db.CrawlSetpTypes.Where(ST => ST.Name == "CrawlStepGetLinkList").First().Id;
                var stepType_2_Id = _db.CrawlSetpTypes.Where(ST => ST.Name == "CrawlStepParseLinkList").First().Id;
                if (_db.CrawlSteppers.Any(S => S.Name == stepperName))
                {
                    if (!_db.CrawlSteps.Any(CS => CS.CrawlStepperId == stepperId && CS.Name == "تحضير و جلب قائمة روابط الأخبار"))
                    {
                        _db.CrawlSteps.Add(new CrawlStep { CrawlStepperId = stepperId, Name = "تحضير و جلب قائمة روابط الأخبار", Url = item[2], Selector = item[3], CrawlStepTypeId = stepType_1_Id });
                        _db.SaveChanges();
                    }
                    if (!_db.CrawlSteps.Any(CS => CS.CrawlStepperId == stepperId && CS.Name == "جلب قائمة الأخبار"))
                    {
                        CrawlStep step = new CrawlStep { CrawlStepperId = stepperId, Name = "جلب قائمة الأخبار", Url = item[2], Selector = item[3], CrawlStepTypeId = stepType_2_Id };
                        _db.CrawlSteps.Add(step);
                        _db.SaveChanges();
                        if (step.Id > 0)
                        {
                            if (item[4] != null)
                                _db.CrawlItems.Add(new CrawlItem { CrawlStepId = step.Id, Name = "Title", Selector = item[4], Value = "", Attr = "" });
                            if (item[5] != null)
                                _db.CrawlItems.Add(new CrawlItem { CrawlStepId = step.Id, Name = "Image", Selector = item[5], Value = "", Attr = "src" });
                            if (item[6] != null)
                                _db.CrawlItems.Add(new CrawlItem { CrawlStepId = step.Id, Name = "Content", Selector = item[6], Value = "", Attr = "" });
                            _db.SaveChanges();
                        }
                    }
                }

            }
        }


    }
}
