﻿using System;
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

        // GET: api/CrawlSteps/Stepper/5
        [HttpGet("Stepper/{id}")]
        public async Task<ActionResult<IEnumerable<CrawlStep>>> GetCrawlStepsByStepper(int id)
        {
            var crawlSteps = await _context.CrawlSteps.Include(S => S.CrawlItems).Where(S => S.CrawlStepperId == id).ToListAsync();

            if (crawlSteps == null || crawlSteps.Count() == 0)
            {
                return Array.Empty<CrawlStep>();
            }

            return crawlSteps;
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
            // _context.CrawlSetpTypes.Where(e => e.Name.Any(n => new List<string> { "CrawlStepGetLinkImgList", "" }.Contains("")).Select(e => e.Id).Contains(crawlStep.CrawlStepTypeId)
            List<string> ListTypes = new List<string> { "CrawlStepGetLinkImgList", "CrawlStepGetLinkList", "CrawlStepGetRssLinks" };
            if (crawlStep.Id > 0 && (ListTypes.Any(L => L.Contains(_context.CrawlSetpTypes.Where( e => e.Id == crawlStep.CrawlStepTypeId).SingleOrDefault().Name))))
            {
                crawlStep.CrawlItems.Add(new CrawlItem { Name = "Title", Selector = "title" });
                crawlStep.CrawlItems.Add(new CrawlItem { Name = "Image" });
                crawlStep.CrawlItems.Add(new CrawlItem { Name = "Content" });
            }
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
