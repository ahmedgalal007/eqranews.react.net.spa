using DAL.Store;
using eqranews.react.net.spa.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Data
{
    public class DAL:IDAL
    {
        private readonly ApplicationDbContext _db;
        private readonly DbNews _news;
        private readonly DbCategory _categories;
        private readonly DbSource _sources;


        public DAL(ApplicationDbContext db)
        {
            this._db = db;
            this._news = new DbNews(db);
            this._categories = new DbCategory(db);
            this._sources = new DbSource(db);

        }

        public Task<int> SaveChanges()
        {
            return this._db.SaveChangesAsync();
        }


        public DbNews GetNews()
        {
            return _news;
        }

        public DbCategory GetCategories()
        {
            return _categories;
        }

        public DbSource GetSource() {
            return this._sources;
        }
    }
}
