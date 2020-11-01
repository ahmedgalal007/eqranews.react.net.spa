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
using Microsoft.Win32.SafeHandles;
using Microsoft.AspNetCore.Hosting;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrawlSourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IWebHostEnvironment _env;

        public CrawlSourcesController(IWebHostEnvironment env, ApplicationDbContext context)
        {
            _context = context;
            _env = env;
        }

        // GET: api/CrawlSources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrawlSource>>> GetCrawlSources()
        {
            return await _context.CrawlSources.Include(s => s.CrawlStepper).ToListAsync();
        }

        // GET: api/CrawlSources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrawlSource>> GetCrawlSource(int id)
        {
            var crawlSource = await _context.CrawlSources.Include(s => s.CrawlStepper).SingleAsync(s => s.Id == id);
            // crawlSource.Logo = Request.Scheme+ "://" + Request.Host.Value + "/" + crawlSource.Logo;

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
        public async Task<IActionResult> PutCrawlSource([FromForm] int id, [FromForm] CrawlSource crawlSource)
        {
            if (id != crawlSource.Id)
            {
                return BadRequest();
            }

            var files = HttpContext.Request.Form.Files;
            await SaveFiles(files, _env.WebRootPath + "\\images\\sources\\", crawlSource);

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
        public async Task<ActionResult<CrawlSource>> PostCrawlSource([FromForm] CrawlSource crawlSource)
        {
            var files = HttpContext.Request.Form.Files;
            await SaveFiles(files, _env.WebRootPath + "\\images\\sources\\", crawlSource);

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

        public async Task SaveFiles(IFormFileCollection files, string path, CrawlSource crawlSource)
        {
            foreach (var file in files)
            {
                string name = crawlSource.Name.Replace(' ', '_');
                string fileName = path + name + Path.GetExtension(GetValidFName(file.FileName));

                await SaveFileToDisk(file, fileName);
                crawlSource.Logo = "/" + path.TrimStart(_env.WebRootPath.ToCharArray()).Replace('\\', '/') + name + Path.GetExtension(GetValidFName(file.FileName));
            }
        }
        public async Task SaveFileToDisk(IFormFile file, string fileName)
        {
            long size = file.Length;

            if (file.Length > 0)
            {
                try
                {
                    //using (var memoryStream = new MemoryStream())
                    //{
                    //    //string location = "";
                    //    file.CopyTo(memoryStream);
                    //    using (FileStream fs = new FileStream(GetValidFName(fileName), FileMode.OpenOrCreate))
                    //    {
                    //        memoryStream.CopyTo(fs);
                    //        // fs.Flush();
                    //    }
                    //}
                    // using (var stream = System.IO.File.Create(GetValidFName(fileName)))

                    Stream stream = new MemoryStream();
                    file.CopyTo(stream);
                    using (var fileStream = new FileStream(Path.GetFullPath(fileName), FileMode.OpenOrCreate, FileAccess.ReadWrite))
                    {
                        stream.Position = 0;
                        await stream.CopyToAsync(fileStream);
                    }
                    stream.Dispose();

                }
                catch (Exception e)
                {
                    var err = e.Message;
                }


            }
            // TODO: Write Code For Save Or Send Result To Another Services For Save

        }

        private string GetValidFName(string fileName)
        {
            foreach (char c in System.IO.Path.GetInvalidFileNameChars())
            {
                fileName = fileName.Replace(c, '_');
            }
            return fileName.Replace(' ', '_');
        }
    }
}
