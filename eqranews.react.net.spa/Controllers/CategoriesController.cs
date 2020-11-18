using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Store;
using eqranews.react.net.spa.Data;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory([FromForm] int id, [FromForm] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            if (category.Default) SetDefaultCategory(category, EntityState.Modified);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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



        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] Category category)
        {
            _context.Categories.Add(category);
            if (category.Default) SetDefaultCategory(category, EntityState.Added);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.Categories.Include(c => c.Childrens).SingleAsync(c => c.Id == id);
            
            if (category == null)
            {
                return NotFound();
            }

            //if (category.Childrens.Any())
            //{
            //    // _logger.LogError($"Cannot delete owner with id: {id}. It has related accounts. Delete those accounts first");
            //    return BadRequest("Cannot delete Category. It has child categories. Unlink or Delete those childrens first");
            //}

            _context.Categories.Remove(category);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e) {
                return  BadRequest(e); 
            }

            return category;
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }

        private void SetDefaultCategory(Category category, EntityState state)
        {
            foreach (var cat in _context.Categories.ToList())
            {
                cat.Default = false;
                _context.Entry(cat).State = EntityState.Modified;
            }
            category.Default = true;
            _context.Entry(category).State = state;
        }
    }
}
