using eqranews.client.mvc.OAuth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eqranews.client.mvc
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options => {
                // options.DefaultAuthenticateScheme = "ClientCookies";
                // options.DefaultSignInScheme = "ClientCookies";
                options.DefaultScheme = "ClientCookies";
                options.DefaultChallengeScheme = "oidc";
            })
                .AddCookie("ClientCookies")
                .AddOpenIdConnect("oidc", options => {
                    options.Authority = "https://localhost:44377";

                    options.ClientId = "client_id";
                    options.ClientSecret = "client_secret";
                    options.ResponseType = "code";

                    options.SaveTokens = true;
                    // Get the Profile Claims
                    options.Scope.Add("profile");
                    options.Scope.Add("custom.profile");
                    options.ClaimActions.MapJsonKey(ClaimTypes.Role, "role", "string");
                    options.ClaimActions.MapJsonKey(ClaimTypes.GivenName, "givenname", "string");
                    options.ClaimActions.MapJsonKey(ClaimTypes.Surname, "surname", "string");
                    options.Events.OnTicketReceived = context =>
                    {
                        var accessToken = context.Principal.Claims;
                        
                        return Task.CompletedTask;
                    };
                    options.GetClaimsFromUserInfoEndpoint = true;
                });

            services.AddScoped<ApplicationUser>();
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                string conn = $"server={Environment.GetEnvironmentVariable("MYSQL_HOST")};" +
                $"port={Environment.GetEnvironmentVariable("MYSQL_TCP_PORT")};" +
                $"user={Environment.GetEnvironmentVariable("MYSQL_USER")};" +
                $"password={Environment.GetEnvironmentVariable("MYSQL_PASSWORD")};" +
                $"database={Environment.GetEnvironmentVariable("MYSQL_DATABASE")}";
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            // This is needed if running behind a reverse proxy
            // like ngrok which is great for testing while developing
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                RequireHeaderSymmetry = false,
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute().RequireAuthorization();
            });
        }
    }
}
