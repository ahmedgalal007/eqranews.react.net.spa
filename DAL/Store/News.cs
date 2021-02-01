using DAL.Crawling;
using DAL.Geo;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Store
{
    public class News
    {
        public News()
        {
            Created = DateTime.Now;
        }
        public int Id { get; set; }
        public string SourceLink { get; set; }
        public string Title { get; set; }
        public string Thumb { get; set; }
        public DateTime Created { get; set; }

        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public int SourceId { get; set; }
        public virtual CrawlSource Source { get; set; }

        public ICollection<NewsItem> NewsItems { get; set; }
        public ICollection<NewsCategory> NewsCategories { get; set; }

    }
}
