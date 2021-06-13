using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Store;
using eqranews.client.mvc.Data;

namespace eqranews.client.mvc.Controllers
{

    public class CategoryController : Controller
    {
        private readonly IDAL _dal;
        public CategoryController(IDAL dAL)
        {
            _dal = dAL;
        }

        [Route("/Category")]
        public IActionResult Index()
        {
            return NotFound();
        }

        [Route("/Category/{Id}")]
        public async Task<IActionResult> Index(int Id, [FromQuery] int Page = 1)
        {
            int take = 10;
            int skip = (Page - 1) * take;
            return View( _dal.GetCategories().GetByIDWithNews(Id,take, skip));
        }
    }
}
