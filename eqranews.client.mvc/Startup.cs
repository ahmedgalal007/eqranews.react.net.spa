using eqranews.client.mvc.Data;
using eqranews.client.mvc.Middlewares;
using eqranews.client.mvc.OAuth;
using eqranews.client.mvc.Services;
using eqranews.geo;
using eqranews.react.net.spa.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eqranews.client.mvc
{
    public class Startup
    {
        string conn;
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Env { get; set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            Env = webHostEnvironment;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (Env.IsEnvironment("Docker"))
            {
                conn = $"server={Environment.GetEnvironmentVariable("MYSQL_HOST")};" +
                $"port={Environment.GetEnvironmentVariable("MYSQL_TCP_PORT")};" +
                $"user={Environment.GetEnvironmentVariable("MYSQL_USER")};" +
                $"password={Environment.GetEnvironmentVariable("MYSQL_PASSWORD")};" +
                $"database={Environment.GetEnvironmentVariable("MYSQL_DATABASE")}";
                conn = "server=localhost;port=3306;user=ahmedgalal007;password=Sico007_;database=eqranews";

            }
            else // if (Env.IsDevelopment())
            {
                //conn = $"server=localhost;" +
                //$"database=eqranews;"+
                //$"user=ahmedgalal007;" +
                //$"password=Sico007_";
                // conn = Configuration.GetConnectionString("DefaultConnection");
                conn = "server=localhost;port=3306;user=ahmedgalal007;password=Sico007_;database=eqranews";

            }

            services.AddAuthentication(options => {
                // options.DefaultAuthenticateScheme = "ClientCookies";
                // options.DefaultSignInScheme = "ClientCookies";
                options.DefaultScheme = "ClientCookies";
                options.DefaultChallengeScheme = "oidc";
            })
                .AddCookie("ClientCookies")
                .AddOpenIdConnect("oidc", options => {
                    options.Authority = "https://admin.eqranews.com";
                    options.RequireHttpsMetadata = true;
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

            services.AddScoped<ApplicationDbContext>();
            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(
                    Configuration.GetConnectionString("DefaultConnection")
                    , mySqlOptionsAction: sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(40), errorNumbersToAdd: null);
                    }
                )
                .UseLazyLoadingProxies(false));

            services.AddScoped<IDAL,Data.DAL>();
            services.AddSingleton<IUtilService, UtilService>();
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            //services.Configure<ForwardedHeadersOptions>(options =>
            //{
            //    options.KnownProxies.Add(IPAddress.Parse("35.209.91.187"));
            //});
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

                conn = "server=localhost;port=3306;user=ahmedgalal007;password=Sico007_;database=eqranews";

            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
                // conn = Configuration.GetConnectionString("DefaultConnection");
                conn = "server=localhost;port=3306;user=ahmedgalal007;password=Sico007_;database=eqranews";


            }
            //app.UseHsts();
            app.UseCors();
            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            //Fix Exception: Correlation failed. Unknown location Exception:
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax
            });
            var forwardOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
                RequireHeaderSymmetry = false
            };

            forwardOptions.KnownNetworks.Clear();
            forwardOptions.KnownProxies.Clear();

            // ref: https://github.com/aspnet/Docs/issues/2384
            app.UseForwardedHeaders(forwardOptions);


            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseGeo();
            // This is needed if running behind a reverse proxy
            // like ngrok which is great for testing while developing
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();//.RequireAuthorization();
            });
        }
    }
}
