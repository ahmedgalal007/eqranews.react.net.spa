using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.EntityFrameworkCore;
using DAL.Crawling;
using eqranews.react.net.spa.Data;

namespace eqranews.client.mvc.Areas.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeApiController : ControllerBase
    {
        ApplicationDbContext _db;


        public HomeApiController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult getHomePageData(string Country)
        {
            List<CrawlSource> _sources = _db.CrawlSources.Include(S => S.Country).Where(S => S.Country.Name == Country).ToList();

            return new JsonResult(
                new
                {
                    Categories = _db.Categories.ToList(),
                    Sources = _sources,
                    News = _db.News.Where(N => _sources.Select(S => S.Id).Contains(N.SourceId)).Include(N=>N.Source).ThenInclude(N => N.Country)
                }
            );

        }


    }
}
