using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using eqranews.react.net.spa.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace eqranews.react.net.spa.Areas.Identity.Pages.Account.Manage
{
    public partial class IndexModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IndexModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public string Username { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        [BindProperty]
        public List<SelectListItem> RoleOptions { get; set; }



        public class InputModel
        {
            [Phone]
            [Display(Name = "Phone number")]
            public string PhoneNumber { get; set; }

            // [Role]
            [Display(Name = "User Role")]
            public string Role { get; set; }

            [Display(Name = "First Name")]
            public string FirstName { get; set; }

            [Display(Name = "Last Name")]
            public string LastName { get; set; }
        }

        private async Task LoadAsync(ApplicationUser user)
        {
            var userName = await _userManager.GetUserNameAsync(user);
            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            var claims = await _userManager.GetClaimsAsync(user);
            Username = userName;
            var firstName = claims.FirstOrDefault(C => C.Type == ClaimTypes.GivenName)?.Value ?? "";
            var lastName = claims.FirstOrDefault(C => C.Type == ClaimTypes.Surname)?.Value ?? "";

            Input = new InputModel
            {
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                Role = RoleOptions.Where(R => R.Selected).FirstOrDefault()?.Value
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            RoleOptions = _roleManager.Roles.Select(a =>
                                         new SelectListItem
                                         {
                                             Value = a.Id.ToString(),
                                             Text = a.Name,
                                             Selected = a.Name == userRoles.FirstOrDefault() ? true : false
                                         }).ToList();
            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }

            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            if (Input.PhoneNumber != phoneNumber)
            {
                var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, Input.PhoneNumber);
                if (!setPhoneResult.Succeeded)
                {
                    StatusMessage = "Unexpected error when trying to set phone number.";
                    return RedirectToPage();
                }
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            var userRoleId = _roleManager.Roles.Where(R => R.Name == userRoles.FirstOrDefault()).FirstOrDefault()?.Id;
            if (Input.Role != userRoleId)
            {
                await _userManager.RemoveFromRolesAsync(user, userRoles);

                var setUserRole = await _userManager.AddToRoleAsync(user, _roleManager.Roles.Where(R => R.Id == Input.Role).FirstOrDefault().Name);
                if (!setUserRole.Succeeded)
                {
                    StatusMessage = "Unexpected error when trying to set User Role.";
                    return RedirectToPage();
                }
            }

            var claimsToAdd = new List<Claim>() {
                new Claim(ClaimTypes.Surname, Input.LastName)
            };

            var userClaims = await _userManager.GetClaimsAsync(user);

            if (userClaims.FirstOrDefault(C => C.Type == ClaimTypes.GivenName)?.Value != Input.FirstName)
            {
                var newClaim = new Claim(ClaimTypes.GivenName, Input.FirstName);
                if ( userClaims.Any(C => C.Type == ClaimTypes.GivenName))
                {
                    try
                    {
                        var oldClaim = userClaims.First(C => C.Type == ClaimTypes.GivenName);
                        if(oldClaim != null)
                            await _userManager.ReplaceClaimAsync(user, oldClaim, newClaim);
                    }
                    catch (Exception e) { }
                }
                else
                {
                    await _userManager.AddClaimAsync(user, newClaim);
                }
                user.FirstName = Input.FirstName;
                await _userManager.UpdateAsync(user);
            }

            if (userClaims.FirstOrDefault(C => C.Type == ClaimTypes.Surname)?.Value != Input.LastName)
            {
                var newClaim = new Claim(ClaimTypes.Surname, Input.LastName);
                if (userClaims.Any(C => C.Type == ClaimTypes.Surname))
                {
                    try
                    {
                        var oldClaim = userClaims.First(C => C.Type == ClaimTypes.Surname);
                        if (oldClaim != null)
                            await _userManager.ReplaceClaimAsync(user, oldClaim, newClaim);
                    }
                    catch (Exception e) { }
                }
                else
                {
                    await _userManager.AddClaimAsync(user, newClaim);
                }
                user.LastName = Input.LastName;
                await _userManager.UpdateAsync(user);
            }

            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Your profile has been updated";
            return RedirectToPage();
        }
    }

    //[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    //public sealed class RoleAttribute : DataTypeAttribute
    //{
    //    public RoleAttribute();

    //    public override bool IsValid(object value) {
    //        if (value != null)
    //        {
    //            return true;
    //        }
    //        return false;
    //    }
    //}
}
