using DAL.Store;
using eqranews.react.net.spa.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace eqranews.client.mvc.Data
{
    public class DbNews
    {
        private readonly ApplicationDbContext _db;

        public DbNews(ApplicationDbContext db)
        {
            this._db = db;
        }

        public async Task<News> GetByID(int Id) {
            var news = await _db.News.FindAsync(Id);
            _db.Entry(news).Collection(e => e.NewsItems);
            return news;
        }

        public async Task<News> Update(News item)
        {
            _db.Entry(item).State = EntityState.Modified;
            _db.Entry(item).Property(x => x.Created).IsModified = false;
            _db.SaveChanges();
            return item;
        }

        public async Task<News> GetByIDWithCategoriesAndSource(int Id)
        {
            return await _db.News.Include(e => e.NewsItems).Include(e => e.NewsCategories).ThenInclude(C => C.Category).Include(e => e.Source).Where(e => e.Id == Id).SingleOrDefaultAsync();
        }

        public async Task<List<News>> GetNews(int Page = 1, int Count = 10)
        {
            return await _db.News.Include(e => e.NewsItems)
                .Include(e => e.NewsCategories).ThenInclude(n => n.Category)
                .OrderByDescending(e => e.Created)
                .Where(e => !string.IsNullOrWhiteSpace(e.Thumb))
                .Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }

        public async Task<List<News>> GetByCountry(int CountryId, int Page = 1, int Count = 10)
        {
            return await _db.News.Include(e => e.NewsItems).Where(e => e.CountryId == CountryId).OrderByDescending(e => e.Created).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }
        public async Task<List<News>> GetBySource(int SourceId, int Page=1, int Count=10)
        {
            return await _db.News.Where(e => e.SourceId == SourceId).OrderByDescending(e => e.Created).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }
        public async Task<List<News>> GetByCategory(int CategoryId, int Page = 1, int Count = 10)
        {
            return await _db.NewsCategories.Include(e => e.News).Where(e => e.CategoryId == CategoryId).OrderByDescending(e => e.News.Created).Skip((Page - 1) * Count).Take(Count).Select(e => e.News).ToListAsync();
        }
        public async Task<List<News>> GetBySourceCategory(int SourceId,int CategoryId, int Page = 1, int Count = 10)
        {
            return await _db.NewsCategories.Include(e => e.News).Where(e => e.CategoryId == CategoryId && e.News.SourceId == SourceId).Select(e => e.News).OrderByDescending(e => e.Created).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }

        public async Task<List<News>> GetMostViewedSourceCategory(int SourceId, int CategoryId, int Page = 1, int Count = 10)
        {
            return await _db.News.Where(e =>  e.CountryId == _db.CrawlSources.Find(SourceId).CountryId && e.Created > DateTime.Now.AddDays(-2)).OrderByDescending(e => e.ViewsCount).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }

        public async Task<List<News>> GetMostViewedCategory(int CategoryId, int Page = 1, int Count = 10)
        {
            return await _db.News.Where(e => e.NewsCategories.SingleOrDefault(e => e.Main).CategoryId == CategoryId && e.Created > DateTime.Now.AddDays(-2)).OrderByDescending(e => e.ViewsCount).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }
        public async Task<List<News>> GetMostViewedSource(int SourceId, int Page = 1, int Count = 10)
        {
            return await _db.News.Where(e => e.CountryId == _db.CrawlSources.Find(SourceId).CountryId && e.Created > DateTime.Now.AddDays(-2)).OrderByDescending(e => e.ViewsCount).Skip((Page - 1) * Count).Take(Count).ToListAsync();
        }
    }
}
