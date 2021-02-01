using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Store;
using eqranews.react.net.spa.Data;
using AngleSharp.Common;
using eqranews.react.net.spa.Models;
using System.Reflection;
using Newtonsoft.Json;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/News
        [HttpGet("GetNews")]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }

        [HttpGet("DataTableHandler")]
        public async Task<DataTableResultViewModelcs<News>> DataTableHandler([FromQuery]int iDisplayStart, [FromQuery] int iDisplayLength, [FromQuery] int iColumns, [FromQuery] int iSortCol_0, [FromQuery] string sSortDir_0   , [FromQuery] string sSearch, [FromQuery] bool bRegex)
        {
            //var iDisplayStart = Request.QueryString.ToDictionary()["iDisplayStart"];
            int totalRecords = _context.News.Select(e => e.Id).Count();
            var result = await _context.News.Skip(iDisplayStart).Take(iDisplayLength).ToListAsync();
            // return  new JsonResult( new DataTableResultViewModelcs<News>() { iTotalDisplayRecords = result.Count, iTotalRecords= totalRecords,  aaData = result }, new JsonSerializerSettings { });
            return new DataTableResultViewModelcs<News>() { iTotalDisplayRecords = totalRecords, iTotalRecords = totalRecords, aaData = result };
        }

        // GET: api/News/5
        [HttpGet("GetNews/{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // PUT: api/News/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNews([FromForm] int id,[FromForm] News news)
        {
            if (id != news.Id)
            {
                return BadRequest();
            }

            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/News
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<News>> PostNews([FromForm] News news)
        {
            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNews", new { id = news.Id }, news);
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<News>> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return news;
        }

        private bool NewsExists(int id)
        {
            return _context.News.Any(e => e.Id == id);
        }
    }
}
