using AngleSharp;
using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using eqranews.react.net.spa.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<CrawlItem> CrawlItems { get; set; }
        public DbSet<CrawlSetpType> CrawlSetpTypes { get; set; }
        public DbSet<CrawlSource> CrawlSources { get; set; }
        public DbSet<CrawlStep> CrawlSteps { get; set; }
        public DbSet<CrawlStepper> CrawlSteppers { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CrawlStepTypeRequiredAttribute> CrawlStepTypeRequiredAttribute { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsCategory> NewsCategories { get; set; }
        public DbSet<NewsItem> NewsItems { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasMany(p => p.Childrens)
                .WithOne(p => p.Parent)
                .HasForeignKey(p => p.ParentId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<CrawlStep>()
                .HasOne<CrawlSetpType>(s => s.CrawlStepType);

        }
    }
}
