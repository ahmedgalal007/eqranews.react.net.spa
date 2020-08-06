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
    public class CrawlStepTypeRequiredAttributesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlStepTypeRequiredAttributesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlStepTypeRequiredAttributes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlStepTypeRequiredAttribute>>> GetCrawlStepTypeRequiredAttribute()
        {
            return await _context.CrawlStepTypeRequiredAttribute.ToListAsync();
        }

        // GET: api/CrawlStepTypeRequiredAttributes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlStepTypeRequiredAttribute>> GetCrawlStepTypeRequiredAttribute(int id)
        {
            var crawlStepTypeRequiredAttribute = await _context.CrawlStepTypeRequiredAttribute.FindAsync(id);

            if (crawlStepTypeRequiredAttribute == null)
            {
                return NotFound();
            }

            return crawlStepTypeRequiredAttribute;
        }

        // PUT: api/CrawlStepTypeRequiredAttributes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlStepTypeRequiredAttribute([FromForm] int id, [FromForm] CrawlStepTypeRequiredAttribute crawlStepTypeRequiredAttribute)
        {
            if (id != crawlStepTypeRequiredAttribute.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlStepTypeRequiredAttribute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlStepTypeRequiredAttributeExists(id))
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

        // POST: api/CrawlStepTypeRequiredAttributes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlStepTypeRequiredAttribute>> PostCrawlStepTypeRequiredAttribute([FromForm] CrawlStepTypeRequiredAttribute crawlStepTypeRequiredAttribute)
        {
            _context.CrawlStepTypeRequiredAttribute.Add(crawlStepTypeRequiredAttribute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlStepTypeRequiredAttribute", new { id = crawlStepTypeRequiredAttribute.Id }, crawlStepTypeRequiredAttribute);
        }

        // DELETE: api/CrawlStepTypeRequiredAttributes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlStepTypeRequiredAttribute>> DeleteCrawlStepTypeRequiredAttribute(int id)
        {
            var crawlStepTypeRequiredAttribute = await _context.CrawlStepTypeRequiredAttribute.FindAsync(id);
            if (crawlStepTypeRequiredAttribute == null)
            {
                return NotFound();
            }

            _context.CrawlStepTypeRequiredAttribute.Remove(crawlStepTypeRequiredAttribute);
            await _context.SaveChangesAsync();

            return crawlStepTypeRequiredAttribute;
        }

        private bool CrawlStepTypeRequiredAttributeExists(int id)
        {
            return _context.CrawlStepTypeRequiredAttribute.Any(e => e.Id == id);
        }
    }
}
