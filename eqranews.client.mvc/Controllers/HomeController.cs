//using AspNetCore;
using eqranews.client.mvc.Data;
using eqranews.client.mvc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IDAL _dal;
        public HomeController(ILogger<HomeController> logger, IDAL dAL)
        {
            _logger = logger;
            _dal = dAL;
        }
        
 
        public IActionResult Index()
        {
            var query = _dal.GetSource().GetCountrySourcesWithNews(2,5);
            List<SourceNews> SourceNews = query.ToList();
            return View(SourceNews);
        }

        [Authorize]
        public IActionResult secret()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
