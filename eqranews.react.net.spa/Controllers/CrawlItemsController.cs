using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Crawling;
using eqranews.react.net.spa.Data;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrawlItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlItem>>> GetCrawlItems()
        {
            return await _context.CrawlItems.ToListAsync();
        }

        // GET: api/CrawlItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlItem>> GetCrawlItem(int id)
        {
            var crawlItem = await _context.CrawlItems.FindAsync(id);

            if (crawlItem == null)
            {
                return NotFound();
            }

            return crawlItem;
        }

        // PUT: api/CrawlItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlItem(int id, CrawlItem crawlItem)
        {
            if (id != crawlItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlItemExists(id))
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

        // POST: api/CrawlItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlItem>> PostCrawlItem(CrawlItem crawlItem)
        {
            _context.CrawlItems.Add(crawlItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlItem", new { id = crawlItem.Id }, crawlItem);
        }

        // DELETE: api/CrawlItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlItem>> DeleteCrawlItem(int id)
        {
            var crawlItem = await _context.CrawlItems.FindAsync(id);
            if (crawlItem == null)
            {
                return NotFound();
            }

            _context.CrawlItems.Remove(crawlItem);
            await _context.SaveChangesAsync();

            return crawlItem;
        }

        private bool CrawlItemExists(int id)
        {
            return _context.CrawlItems.Any(e => e.Id == id);
        }
    }
}
