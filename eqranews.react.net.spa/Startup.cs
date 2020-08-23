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

namespace eqranews.react.net.spa
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
            services.AddHangfire(config =>
                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseDefaultTypeSerializer()
                .UseMemoryStorage());

            services.AddHangfireServer();

            string conn = $"server={Environment.GetEnvironmentVariable("MYSQL_HOST")};" +
                $"port={Environment.GetEnvironmentVariable("MYSQL_TCP_PORT")};" +
                $"user={Environment.GetEnvironmentVariable("MYSQL_USER")};" +
                $"password={Environment.GetEnvironmentVariable("MYSQL_PASSWORD")};" +
                $"database={Environment.GetEnvironmentVariable("MYSQL_DATABASE")}";
            Console.WriteLine(conn);
            services.AddScoped<ApplicationDbContext>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    // Configuration.GetConnectionString("DevConnectionMySQL")
                    conn, mySqlOptionsAction: sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                    }
                ).UseLazyLoadingProxies(false)

            );

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer(opt =>
            {
                var jwtState = opt.Endpoints.EnableJwtRequestUri;
                // opt.Events.RaiseSuccessEvents
                // opt.Authentication.CookieLifetime
            })
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

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
            services.AddSingleton<ICrawlManager, CrawlManager>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ICrawlManager crawlManager)
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
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new MyAuthorizationFilter() },
                IgnoreAntiforgeryToken = true                                 // <--This
            });


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
                endpoints.MapHangfireDashboard();
            });

          


            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


            // Apply Migration to Database
            InitializeDatabase(app);

            // Add HangFire
            // backgroundJobClient.Enqueue(() => Console.WriteLine("Hello Hangfire job!!!!"));
            // recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "* * * * *");

            //CrawlUtils.Instance.createJobs();
            crawlManager.CreateEnabledSourcesJobs(app);
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
                // scope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

            }
        }
    }
}
