using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using eqranews.react.net.spa.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Middlewares
{
    public static class BuilderExtensions
    {
        public static IApplicationBuilder UseGeo(this IApplicationBuilder app)
        {


            List<CrawlSource> _CrawlSources;
            List<Country> _DalCountries;
            List<Category> _Categories;

            using (var scope = app.ApplicationServices.CreateScope()) {
                ApplicationDbContext db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                _CrawlSources = db.CrawlSources.ToList();
                _DalCountries = db.Countries.ToList();
                _Categories = db.Categories.ToList();
            }
            return app.UseMiddleware<GeoMiddleware>(_CrawlSources, _DalCountries, _Categories);
        }
    }
}
