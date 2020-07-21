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
    public class CrawlSetpTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlSetpTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlSetpTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlSetpType>>> GetCrawlSetpTypes()
        {
            return await _context.CrawlSetpTypes.ToListAsync();
        }

        // GET: api/CrawlSetpTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlSetpType>> GetCrawlSetpType(int id)
        {
            var crawlSetpType = await _context.CrawlSetpTypes.FindAsync(id);

            if (crawlSetpType == null)
            {
                return NotFound();
            }

            return crawlSetpType;
        }

        // PUT: api/CrawlSetpTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlSetpType(int id, CrawlSetpType crawlSetpType)
        {
            if (id != crawlSetpType.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlSetpType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlSetpTypeExists(id))
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

        // POST: api/CrawlSetpTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlSetpType>> PostCrawlSetpType(CrawlSetpType crawlSetpType)
        {
            _context.CrawlSetpTypes.Add(crawlSetpType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlSetpType", new { id = crawlSetpType.Id }, crawlSetpType);
        }

        // DELETE: api/CrawlSetpTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlSetpType>> DeleteCrawlSetpType(int id)
        {
            var crawlSetpType = await _context.CrawlSetpTypes.FindAsync(id);
            if (crawlSetpType == null)
            {
                return NotFound();
            }

            _context.CrawlSetpTypes.Remove(crawlSetpType);
            await _context.SaveChangesAsync();

            return crawlSetpType;
        }

        private bool CrawlSetpTypeExists(int id)
        {
            return _context.CrawlSetpTypes.Any(e => e.Id == id);
        }
    }
}
