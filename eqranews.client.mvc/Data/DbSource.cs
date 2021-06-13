using DAL.Store;
using eqranews.react.net.spa.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eqranews.crawling.Models;
using DAL.Crawling;
using eqranews.client.mvc.Models;

namespace eqranews.client.mvc.Data
{
    public class DbSource
    {
        private readonly ApplicationDbContext _db;

        public DbSource(ApplicationDbContext db)
        {
            this._db = db;
        }

        public async Task<CrawlSource> GetByID(int Id) {
            return await _db.CrawlSources.FindAsync(Id);
        }



        public IQueryable<SourceNews> GetCountrySourcesWithNews(int CountryId, int newsCount)
        {

            var query = _db.Set<CrawlSource>()
                    .Where(S => S.CountryId == CountryId)
                    .Select(t => t.Id).Distinct() // <--
                    .Select(key => 
                        new SourceNews {
                            Source = _db.CrawlSources.SingleOrDefault(S => S.Id == key),
                            News =
                                _db.Set<News>().Where(n => n.SourceId == key) // <--
                                     .OrderByDescending(t => t.Created).Take(newsCount)
                                     .ToList() // <--
                    });

            return query;
        }

        


    }
}
