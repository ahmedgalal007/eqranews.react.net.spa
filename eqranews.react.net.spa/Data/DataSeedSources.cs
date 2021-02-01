using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedSources
    {
        public static void Seed(IServiceScope scope)
        {
            var _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var _sources = new List<CrawlSource> {                
                new CrawlSource {Name="الأهرام", CountryId= 0, DomainURL="http://gate.ahram.org.eg/", Logo="/images/sources/Al_Ahram.jpg" },
                new CrawlSource {Name="اليوم السابع", CountryId= 0, DomainURL="https://www.youm7.com/" },
                new CrawlSource {Name="عكاظ", CountryId= 0, DomainURL="https://www.okaz.com.sa/", Logo="https://www.okaz.com.sa/themes/okazksa/images/new-okazlogo.svg" },
                new CrawlSource {Name="المدينة", CountryId= 0, DomainURL="https://www.al-madina.com/" },
                new CrawlSource {Name="الشرق الأوسط", CountryId= 0, DomainURL="https://aawsat.com/" },
                new CrawlSource {Name="الحياة", CountryId= 0, DomainURL="http://www.alhayat.com/" },
                new CrawlSource {Name="الجزيرة", CountryId= 0, DomainURL="https://www.al-jazirah.com/" },
                new CrawlSource {Name="مكة", CountryId= 0, DomainURL="https://makkahnewspaper.com/" },
                new CrawlSource {Name="سبق", CountryId= 0, DomainURL="https://sabq.org/" },
                new CrawlSource {Name="اليوم", CountryId= 0, DomainURL="https://www.alyaum.com/" },
                new CrawlSource {Name="البلاد", CountryId= 0, DomainURL="https://albiladdaily.com/" },
                new CrawlSource {Name="الاقتصادية", CountryId= 0, DomainURL="https://www.aleqt.com/" },
                new CrawlSource {Name="العربية", CountryId= 0, DomainURL="https://www.alarabiya.net/" },
                new CrawlSource {Name="جريدة الاتحاد", CountryId= 0, DomainURL="https://www.alittihad.ae/" },
                new CrawlSource {Name="البيان", CountryId= 0, DomainURL="https://www.albayan.ae/" },
                new CrawlSource {Name="بوابة العين الإخبارية", CountryId= 0, DomainURL="https://al-ain.com/" },
                new CrawlSource {Name="جريدة الخليج", CountryId= 0, DomainURL="https://www.alkhaleej.ae/" },
                new CrawlSource {Name="الإمارات اليوم", CountryId= 0, DomainURL="https://www.emaratalyoum.com/" },
                new CrawlSource {Name="صحيفة الرؤية الإمارتية", CountryId= 0, DomainURL="https://www.alroeya.com/" },
                new CrawlSource {Name="صحيفة الوطن الإماراتية", CountryId= 0, DomainURL="https://alwatan.ae/" },
                new CrawlSource {Name="ارم", CountryId= 0, DomainURL="https://www.eremnews.com/" },
                new CrawlSource {Name="نشوان نيوز", CountryId= 0, DomainURL="https://nashwannews.com/" },
                new CrawlSource {Name="الساحل الغربي", CountryId= 0, DomainURL="https://www.alsahil.net/" },
                new CrawlSource {Name="الشارع", CountryId= 0, DomainURL="https://alsharaeanews.com/" },
                new CrawlSource {Name="الثورة", CountryId= 0, DomainURL="https://althawra-news.net/" },
                new CrawlSource {Name="يمن فويس", CountryId= 0, DomainURL="https://yemenvoice.net/news155333.html" },
                new CrawlSource {Name="المصدر اونلاين", CountryId= 0, DomainURL="https://almasdaronline.com/" },
                new CrawlSource {Name="يمن ميديا", CountryId= 0, DomainURL="https://ye-media.net/" },
                new CrawlSource {Name="التغييير نت", CountryId= 0, DomainURL="https://www.yemenakhbar.com/author/altagheer" },
                new CrawlSource {Name="العاصمة اونلاين", CountryId= 0, DomainURL="https://alasimahonline.com/" },
            };

            List<string> Egypt = new List<string> { "الأهرام", "اليوم السابع" };

            List<string> SaudiArabia = new List<string> { "عكاظ", "المدينة", "الشرق الأوسط", "الحياة", "الجزيرة", "مكة", "سبق", "اليوم", "البلاد", "الاقتصادية", "العربية" };

            List<string> Emirates = new List<string> { "جريدة الاتحاد", "البيان", "بوابة العين الإخبارية", "جريدة الخليج", "الإمارات اليوم", "صحيفة الرؤية الإمارتية", "صحيفة الوطن الإماراتية", "ارم" };

            List<string> Yemen = new List<string> { "نشوان نيوز", "الساحل الغربي", "الشارع", "الثورة", "يمن فويس", "المصدر اونلاين", "يمن ميديا", "التغييير نت", "العاصمة اونلاين" };

            if (_db.Countries.Any(C => C.IsoCode == "EG"))
            {
                SetSourcesCountryByList(Sources: _sources, CountryId: _db.Countries.First(C => C.IsoCode == "EG").Id, CountryNames: Egypt);
            }
            if (_db.Countries.Any(C => C.IsoCode == "SA"))
            {
                SetSourcesCountryByList(Sources: _sources, CountryId: _db.Countries.First(C => C.IsoCode == "SA").Id, CountryNames: SaudiArabia);
            }
            if (_db.Countries.Any(C => C.IsoCode == "UAE"))
            {
                SetSourcesCountryByList(Sources: _sources, CountryId: _db.Countries.First(C => C.IsoCode == "UAE").Id, CountryNames: Emirates);
            }
            if (_db.Countries.Any(C => C.IsoCode == "YEM"))
            {
                SetSourcesCountryByList(Sources: _sources, CountryId: _db.Countries.First(C => C.IsoCode == "YEM").Id, CountryNames: Yemen);
            }
            foreach (var source in _sources)
            {
                if (!_db.CrawlSources.Any(C => C.Name == source.Name))
                {
                    _db.CrawlSources.Add(source);
                };
            }
            _db.SaveChanges();
        }

        private static void SetSourcesCountryByList(List<CrawlSource> Sources, int CountryId, List<string> CountryNames)
        {
            foreach (var name in CountryNames)
            {
                if (Sources.Any(S => S.Name == name))
                {
                    Sources.Where(S => S.Name == name).First().CountryId = CountryId;
                }
            }
        }
    }
}
