using eqranews.react.net.spa.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public static class DataSeedIdentity
    {
        public static void Seed(IServiceScope scope) {
            CreateRoles(scope);
        }
        private static void CreateRoles(IServiceScope scope)
        {
            List<string> _roleNames = new List<string>() { "Administrator", "Subscriber", "Editor", "Moderator" };
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            Task<IdentityResult> roleResult;
            string email = "ahmedgalal007@gmail.com";

            //Check that there is an Administrator role and create if not
            
            foreach (string role in _roleNames)
            {
                Task<bool> hasAdminRole = roleManager.RoleExistsAsync(role);
                hasAdminRole.Wait();

                if (!hasAdminRole.Result)
                {
                    roleResult = roleManager.CreateAsync(new IdentityRole(role));
                    roleResult.Wait();
                }
            }


            //Check if the admin user exists and create it if not
            //Add to the Administrator role

            Task<ApplicationUser> testUser = userManager.FindByEmailAsync(email);
            testUser.Wait();

            if (testUser.Result == null)
            {
                ApplicationUser administrator = new ApplicationUser();
                administrator.Email = email;
                administrator.UserName = email;
                Task<IdentityResult> newUser = userManager.CreateAsync(administrator, "Sico007_");
                newUser.Wait();

                if (newUser.Result.Succeeded)
                {
                    // Task<IdentityResult> IsUserConfirmed = userManager.ConfirmEmailAsync(newUser, userManager.GenerateEmailConfirmationTokenAsync(newUser));
                    Task<IdentityResult> newUserRole = userManager.AddToRoleAsync(administrator, "Administrator");
                    newUserRole.Wait();
                }
            }
        }
    }
}
