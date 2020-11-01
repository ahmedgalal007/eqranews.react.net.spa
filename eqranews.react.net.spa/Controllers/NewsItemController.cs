using eqranews.react.net.spa.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsItemController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        public NewsItemController(ApplicationDbContext context)
        {
            db = context;
        }

        [HttpGet("GetNewsItem/{id}")]
        public async Task<ActionResult> GetNewsItem(int id)
        {
            var item = await db.News.SingleOrDefaultAsync(N => N.Id == id);
            var details = await db.NewsItems.Where(N => N.NewsId == id).ToListAsync();

            return Ok(new { 
                News= item,
                Items = details
            });
        }
    }
}
