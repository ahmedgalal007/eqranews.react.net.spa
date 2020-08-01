using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Crawling;
using eqranews.react.net.spa.Data;
using System.Net.Mime;
using System.IO;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrawlSourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CrawlSourcesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CrawlSources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlSource>>> GetCrawlSources()
        {
            return await _context.CrawlSources.ToListAsync();
        }

        // GET: api/CrawlSources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlSource>> GetCrawlSource(int id)
        {
            var crawlSource = await _context.CrawlSources.FindAsync(id);

            if (crawlSource == null)
            {
                return NotFound();
            }

            return crawlSource;
        }

        // PUT: api/CrawlSources/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrawlSource(int id, CrawlSource crawlSource)
        {
            if (id != crawlSource.Id)
            {
                return BadRequest();
            }

            _context.Entry(crawlSource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrawlSourceExists(id))
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

        // POST: api/CrawlSources
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CrawlSource>> PostCrawlSource(CrawlSource crawlSource)
        {
            var fileBytes = new List<byte[]>();
            var files = HttpContext.Request.Form.Files;
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        fileBytes.Add(memoryStream.ToArray());
                    }
                }
            }
            // TODO: Write Code For Save Or Send Result To Another Services For Save
        

            _context.CrawlSources.Add(crawlSource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrawlSource", new { id = crawlSource.Id }, crawlSource);
        }

        // DELETE: api/CrawlSources/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CrawlSource>> DeleteCrawlSource(int id)
        {
            var crawlSource = await _context.CrawlSources.FindAsync(id);
            if (crawlSource == null)
            {
                return NotFound();
            }

            _context.CrawlSources.Remove(crawlSource);
            await _context.SaveChangesAsync();

            return crawlSource;
        }

        private bool CrawlSourceExists(int id)
        {
            return _context.CrawlSources.Any(e => e.Id == id);
        }
    }
}
