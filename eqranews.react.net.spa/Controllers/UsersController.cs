using eqranews.react.net.spa.Areas.Identity.Pages.Account;
using eqranews.react.net.spa.Data;
using eqranews.react.net.spa.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly IUserStore<ApplicationUser> _userStore;


        public UsersController(
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            SignInManager< ApplicationUser > signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,
            IUserStore<ApplicationUser> userStore)
        {
            _db = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _userStore = userStore;
        }

        [HttpGet("getUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> getUsers([FromQueryAttribute] int pageNumber = 1, [FromQueryAttribute] int usersInPage = 10)
        {
            var users = _userManager.Users.OrderBy(U => U.Id).Take(usersInPage).Skip(usersInPage * (pageNumber - 1));
            var result = await users.ToListAsync();
            return result;
        }

        [HttpGet("getUsersInRole/{roleName}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> getUsersInRole(string roleName, [FromQueryAttribute] int pageNumber = 1, [FromQueryAttribute] int usersInPage = 0)
        {
            var result = await _userManager.GetUsersInRoleAsync(roleName);
            if (pageNumber == 1 && usersInPage == 0 )
                return result.ToList();
            return result.OrderBy(U => U.Id).Take(usersInPage).Skip(usersInPage * (pageNumber - 1)).ToList();
        }
    }
}
