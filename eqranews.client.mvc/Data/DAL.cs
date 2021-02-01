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

        public DAL(ApplicationDbContext db)
        {
            this._db = db;
            this._news = new DbNews(db);
        }

        public DbNews GetNews()
        {
            return _news;
        }
    }
}
