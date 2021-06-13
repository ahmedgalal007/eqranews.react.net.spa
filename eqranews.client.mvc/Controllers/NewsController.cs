using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Store;
using eqranews.client.mvc.Data;

namespace eqranews.client.mvc.Controllers
{

    public class NewsController : Controller
    {
        private readonly IDAL _dal;
        public NewsController(IDAL dAL)
        {
            _dal = dAL;
        }

        [Route("/News")]
        public IActionResult Index()
        {
            return NotFound();
        }

        [Route("/News/{Id}")]
        public IActionResult Index(int Id)
        {
            return View(_dal.GetNews().GetByIDWithCategoriesAndSource(Id).Result);
        }


        [HttpPost]
        [Route("/News/IncrementViews")]
        public async  Task<int> ViewsIncrement (int NewsId){
            News item = _dal.GetNews().GetByID(NewsId).Result;
            item.ViewsCount = item.ViewsCount + 1;
            await _dal.GetNews().Update(item);
            return item.ViewsCount;
        }
    }
}
