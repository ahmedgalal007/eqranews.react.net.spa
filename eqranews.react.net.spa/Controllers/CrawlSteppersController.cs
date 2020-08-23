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
    public class CrawlSteppersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlSteppersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlSteppers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlStepper>>> GetCrawlSteppers()
        {
            return await _context.CrawlSteppers.ToListAsync();
        }

        // GET: api/CrawlSteppers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlStepper>> GetCrawlStepper(int id)
        {
            var crawlStepper = await _context.CrawlSteppers.FindAsync(id);

            if (crawlStepper == null)
            {
                return NotFound();
            }

            return crawlStepper;
        }

        // GET: api/CrawlSteppers/Source/5
        [HttpGet("Source/{id}")]
        public async Task<ActionResult<IEnumerable<CrawlStepper>>> GetCrawlSteppersBySource(int id)
        {
            var crawlSteppers = await _context.CrawlSteppers.Include(S => S.CrawlSteps).Where(S => S.CrawlSourceId == id ).ToListAsync();

            if (crawlSteppers == null || crawlSteppers.Count() ==0)
            {
                return Array.Empty<CrawlStepper>();
            }

            return crawlSteppers;
        }

        // PUT: api/CrawlSteppers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlStepper([FromForm] int id, [FromForm] CrawlStepper crawlStepper)
        {
            if (id != crawlStepper.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlStepper).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlStepperExists(id))
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

        // POST: api/CrawlSteppers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlStepper>> PostCrawlStepper([FromForm] CrawlStepper crawlStepper)
        {
            _context.CrawlSteppers.Add(crawlStepper);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlStepper", new { id = crawlStepper.Id }, crawlStepper);
        }

        // DELETE: api/CrawlSteppers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlStepper>> DeleteCrawlStepper(int id)
        {
            var crawlStepper = await _context.CrawlSteppers.FindAsync(id);
            if (crawlStepper == null)
            {
                return NotFound();
            }

            _context.CrawlSteppers.Remove(crawlStepper);
            await _context.SaveChangesAsync();

            return crawlStepper;
        }

        private bool CrawlStepperExists(int id)
        {
            return _context.CrawlSteppers.Any(e => e.Id == id);
        }
    }
}
