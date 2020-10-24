using eqranews.react.net.spa.Areas.Identity.Pages.Account;
using eqranews.react.net.spa.Data;
using eqranews.react.net.spa.Models;
using Hangfire.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            ILogger<RegisterModel> logger,
            RoleManager<IdentityRole> roleManager
            )
        {
            _db = dbContext;
            _userManager = userManager;
            _logger = logger;
            _roleManager = roleManager;
        }

        [HttpGet("getRoles")]
        public async Task<ActionResult<IEnumerable<IdentityRole>>> getRoles()
        {
            var result = await _roleManager.Roles.ToListAsync();
            return result;
        }
    }
}
