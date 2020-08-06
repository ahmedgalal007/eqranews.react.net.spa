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
    public class CrawlStepsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlStepsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlSteps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlStep>>> GetCrawlSteps()
        {
            return await _context.CrawlSteps.ToListAsync();
        }

        // GET: api/CrawlSteps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlStep>> GetCrawlStep(int id)
        {
            var crawlStep = await _context.CrawlSteps.FindAsync(id);

            if (crawlStep == null)
            {
                return NotFound();
            }

            return crawlStep;
        }

        // PUT: api/CrawlSteps/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlStep([FromForm] int id, [FromForm] CrawlStep crawlStep)
        {
            if (id != crawlStep.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlStep).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlStepExists(id))
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

        // POST: api/CrawlSteps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlStep>> PostCrawlStep([FromForm] CrawlStep crawlStep)
        {
            _context.CrawlSteps.Add(crawlStep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlStep", new { id = crawlStep.Id }, crawlStep);
        }

        // DELETE: api/CrawlSteps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlStep>> DeleteCrawlStep(int id)
        {
            var crawlStep = await _context.CrawlSteps.FindAsync(id);
            if (crawlStep == null)
            {
                return NotFound();
            }

            _context.CrawlSteps.Remove(crawlStep);
            await _context.SaveChangesAsync();

            return crawlStep;
        }

        private bool CrawlStepExists(int id)
        {
            return _context.CrawlSteps.Any(e => e.Id == id);
        }
    }
}
