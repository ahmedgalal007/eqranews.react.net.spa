using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using eqranews.react.net.spa.Data;
using eqranews.react.net.spa.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Hangfire;
using Hangfire.MemoryStorage;
using eqranews.react.net.spa.Services;
using Newtonsoft.Json;
using Hangfire.MySql.Core;
using System.Threading.Tasks;
using System.Collections.Generic;
using eqranews.react.net.spa.IdentityServer;

namespace eqranews.react.net.spa
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Env { get; set; }
        string conn;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            Env = webHostEnvironment;
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // IMvcBuilder builder = services.AddRazorPages();
            //#if DEBUG
            //            if (Env.IsDevelopment())
            //            {
            //                builder.AddRazorRuntimeCompilation();
            //            }
            //#endif
            if (Env.IsEnvironment("Docker"))
            {
                conn = $"server={Environment.GetEnvironmentVariable("MYSQL_HOST")};" +
                $"port={Environment.GetEnvironmentVariable("MYSQL_TCP_PORT")};" +
                $"user={Environment.GetEnvironmentVariable("MYSQL_USER")};" +
                $"password={Environment.GetEnvironmentVariable("MYSQL_PASSWORD")};" +
                $"database={Environment.GetEnvironmentVariable("MYSQL_DATABASE")}";
            }
            else if (Env.IsDevelopment())
            {
                conn = $"server=localhost;" +
                $"port=3306;" +
                $"user=ahmedgalal007;" +
                $"password=Sico007_;" +
                $"database=eqranews";
            }
            services.AddHangfire(config =>
                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseDefaultTypeSerializer()
                //.UseMemoryStorage(new MemoryStorageOptions { CountersAggregateInterval = TimeSpan.FromSeconds(30)})
                .UseStorage(new MySqlStorage(conn + "; Allow User Variables=True"))
                .UseSerializerSettings(new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                })
                
            );

            services.AddHangfireServer();

            
            services.AddScoped<ApplicationDbContext>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    // Configuration.GetConnectionString("DevConnectionMySQL")
                    conn, mySqlOptionsAction: sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(40), errorNumbersToAdd: null);
                    }
                )
                .UseLazyLoadingProxies(false)

            );

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer(opt =>
            {
                var jwtState = opt.Endpoints.EnableJwtRequestUri;
                // opt.Events.RaiseSuccessEvents
                // opt.Authentication.CookieLifetime
            })
            // .AddInMemoryApiResources(Id4Configuration.GetApis())
            // .AddInMemoryClients(Id4Configuration.GetClients())
            // .AddDeveloperSigningCredential()
            .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(config =>
            {
                // config.IdentityResources.Add(new IdentityServer4.Models.IdentityResource( System.Security.Claims.ClaimTypes.GivenName));
                Id4Configuration.AddIdentityResources(config.IdentityResources);
                Id4Configuration.AddApis(config.ApiResources);
                Id4Configuration.AddClients(config.Clients);
            })
            .AddProfileService<ProfileService>();
            

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddRazorPages();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //new CrawlUtils(services);
            services.AddSingleton<CrawlManager>(sp => new CrawlManager(sp));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, CrawlManager crawlManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
            }
            app.UseCors();
            // app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // //Hangfire Service 
            //app.UseHangfireDashboard("/hangfire", new DashboardOptions
            //{
            //    Authorization = new[] { new MyAuthorizationFilter() },
            //    IgnoreAntiforgeryToken = true                                 // <--This
            //});


            app.UseRouting();
            app.UseHangfireServer();

           


            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapHangfireDashboard(new DashboardOptions
                {
                    Authorization = new[] { new MyAuthorizationFilter() },
                    IgnoreAntiforgeryToken = true                                 // <--This
                });
            });

          


            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                    spa.UseReactDevelopmentServer(npmScript: "start");
                    // spa.UseProxyToSpaDevelopmentServer("https://localhost:3000/");
                }
            });


            // Apply Migration to Database
            DataSeed.InitializeDatabase(app);
            // CreateRoles(app.ApplicationServices);
            // Add HangFire
            // backgroundJobClient.Enqueue(() => Console.WriteLine("Hello Hangfire job!!!!"));
            // recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "* * * * *");

            //CrawlUtils.Instance.createJobs();
            crawlManager.CreateEnabledSourcesJobs();
        }

        //private void InitializeDatabase(IApplicationBuilder app)
        //{
           
        //}


        //private void CreateRoles(IServiceProvider serviceProvider)
        //{
        //    using (var scope = serviceProvider.GetService<IServiceScopeFactory>().CreateScope())
        //    {

               
        //    }
        //}

    }
}
