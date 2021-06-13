using DAL.Store;
using eqranews.react.net.spa.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eqranews.client.mvc.Models;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;

namespace eqranews.client.mvc.Data
{
    public class DbCategory
    {
        private readonly ApplicationDbContext _db;

        public DbCategory(ApplicationDbContext db)
        {
            this._db = db;
        }

        public async Task<Category> GetByID(int Id) {
            return await _db.Categories.FindAsync(Id);
        }

        public  CategoryNews GetByIDWithNews(int CategoryId, int take=10, int skip = 0)
        {
            //var category = await _db.Categories.Where(e => e.Id == CategoryId).Include(e => e.NewsCategories).ThenInclude(e => e.News).FirstOrDefaultAsync();
            //var category = await  _db.Categories.Where(e => e.Id == CategoryId).Include(e => e.NewsCategories.Select(e => e.News )).FirstOrDefaultAsync();
            //return category;

            return new CategoryNews {
                Category = _db.Set<Category>().Find(CategoryId),
                News = _db.NewsCategories.Include(e => e.News).Where(e => e.CategoryId == CategoryId).Select(e => e.News).OrderByDescending(e => e.Created).Skip(skip).Take(take).ToList(),
                TotalPages = (int)Math.Ceiling((double)(GetCount(CategoryId) / take)),
                Page = skip + take > 0 ? (int)Math.Ceiling((double)((skip + take)/ take)) : 0
            };
        }

        public CategoryNews GetBySourceIDWithNews(int CategoryId, int SourceId, int take = 10, int skip = 0)
        {
            return new CategoryNews
            {
                Category = _db.Set<Category>().Find(CategoryId),
                News = _db.NewsCategories.Include(e => e.News).Where(e => e.CategoryId == CategoryId && e.News.SourceId == SourceId).Select(e => e.News).OrderByDescending(e => e.Created).Skip(skip).Take(take).ToList(),
                TotalPages = (int)Math.Ceiling((double)(GetCountInSource(CategoryId, SourceId) / take)),
                Page = skip + take > 0 ? (int)Math.Ceiling((double)((skip + take) / take)) : 0
            };
        }

        public int GetCount(int CategoryId)
        {
            return _db.NewsCategories.Where(e => e.CategoryId == CategoryId).Select(e => e.Id).Count();
        }

        public int GetCountInSource(int CategoryId, int SourceId)
        {
            return _db.NewsCategories.Where(e => e.CategoryId == CategoryId && e.News.SourceId == SourceId).Select(e => e.Id).Count();
        }


    }
}
