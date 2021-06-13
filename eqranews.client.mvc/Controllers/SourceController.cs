using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Store;
using eqranews.client.mvc.Data;

namespace eqranews.client.mvc.Controllers
{

    public class SourceController : Controller
    {
        private readonly IDAL _dal;
        public SourceController(IDAL dAL)
        {
            _dal = dAL;
        }

        [Route("/Source")]
        public IActionResult Index()
        {
            return NotFound();
        }

        [Route("/Source/{Id}")]
        public async Task<IActionResult> Index(int Id)
        {
            DAL.Crawling.CrawlSource Source = await _dal.GetSource().GetByID(Id);
            return View( _dal.GetSource().GetCountrySourcesWithNews(Source.CountryId, 10).FirstOrDefault());
        }

    }
}
