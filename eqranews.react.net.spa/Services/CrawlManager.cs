﻿using DAL.Crawling;
using DAL.Store;
using eqranews.crawling.Models;
using eqranews.crawling.Models.CrawlSteps;
using eqranews.react.net.spa.Data;
using Hangfire;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Services
{
    public class CrawlManager : ICrawlManager
    {
        private static IServiceProvider _serviceProvider;

        public static IApplicationBuilder builder;
        private IBackgroundJobClient backgroundJobClient;
        private IRecurringJobManager recurringJobManager;


        //public CrawlManager(IServiceProvider serviceProvider)
        //{
        //    //this.db = serviceProvider.GetRequiredService<ApplicationDbContext>();
        //    //this.backgroundJobClient = serviceProvider.GetRequiredService<IBackgroundJobClient>();
        //    //this.recurringJobManager = serviceProvider.GetRequiredService<IRecurringJobManager>();
        //}
        //public CrawlManager(IApplicationBuilder app)
        //{
        //    builder = app;
        //}

        protected internal CrawlManager(IServiceProvider sp)
        {
            _serviceProvider = sp;
        }

        public void CreateEnabledSourcesJobs()
        {
            //builder = app;
            using (var scope = _serviceProvider.CreateScope())
            {
                ApplicationDbContext db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                this.backgroundJobClient = scope.ServiceProvider.GetRequiredService<IBackgroundJobClient>();
                this.recurringJobManager = scope.ServiceProvider.GetRequiredService<IRecurringJobManager>();
                // db.CrawlSources.ToList();
                // backgroundJobClient.Enqueue(() => Console.WriteLine("Hello From CrawlManager"));
                // recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "* * * * *");

                createJobs(this.recurringJobManager, db);
            }
        }

        public void createJobs(IRecurringJobManager manager, ApplicationDbContext innerdb)
        {
            var sources = innerdb.CrawlSources.Include(x => x.CrawlStepper).ThenInclude(s => s.CrawlSteps).ThenInclude(i => i.CrawlItems).Include("CrawlStepper.CrawlSteps.CrawlStepType").ToList();
            foreach (DAL.Crawling.CrawlSource source in sources)
            {
                foreach (DAL.Crawling.CrawlStepper stepper in source.CrawlStepper.ToList())
                {
                    if (stepper.Enabled)
                    {
                        manager.AddOrUpdate(stepper.Name, () => CrawlStepperToDatabase(stepper.Id), "*/" + stepper.RecuringTime.TotalMinutes + " * * * *");
                    }
                }
            };
        }


        public async Task CrawlStepperToDatabase(int Id)
        {

            var stepperEng = new eqranews.crawling.Models.CrawlStepper();
            List<eqranews.crawling.Models.CrawlResult> results = new List<eqranews.crawling.Models.CrawlResult>();

            using (var scope = _serviceProvider.CreateScope())
            {
                // var services = _serviceProvider;
                ApplicationDbContext db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                if (db.CrawlSteppers.Any(x => x.Id == Id))
                {
                    DAL.Crawling.CrawlStepper stepper = db.CrawlSteppers.Include(s => s.CrawlSteps).ThenInclude(i => i.CrawlItems).Include("CrawlSteps.CrawlStepType").Where(x => x.Id == Id).SingleOrDefault();

                    foreach (DAL.Crawling.CrawlStep step in stepper.CrawlSteps.ToList())
                    {
                        List<eqranews.crawling.Models.CrawlItem> CrawlItems = new List<eqranews.crawling.Models.CrawlItem>();

                        var newParams = new object[] { step.Id, crawling.Models.CrawlSteps.CrawlSetpType.Single, new AngleSharp.Url(step.Url), step.Selector };

                        step.CrawlItems.ToList().ForEach(item =>
                        {
                            CrawlItems.Add(new eqranews.crawling.Models.CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr, Value = item.Value });
                        });

                        string StepClassFullName = String.Format("eqranews.crawling.Models.CrawlSteps.{0}, eqranews.crawling, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", step.CrawlStepType.Name);
                        Type t = Type.GetType(StepClassFullName);
                        if (t == null) return;

                        var instance = (eqranews.crawling.Models.CrawlSteps.CrawlStep)Activator.CreateInstance(t, newParams);
                        var myPropInfo = t.GetProperty("CrawlItems");
                        myPropInfo.SetValue(instance, CrawlItems);

                        // Add step to stepper
                        stepperEng.StepSequence.Add(instance);

                    };
                    results = await stepperEng.Crawl();
                    await SaveToStore(results, db, stepper);
                }

            }

        }



        // Save the results in the database
        public async Task SaveToStore(List<CrawlResult> results, ApplicationDbContext db, DAL.Crawling.CrawlStepper stepper)
        {
            try
            {
                var distinctResult = new List<CrawlResult>();
                foreach (CrawlResult item in results)
                {
                    if (distinctResult.Where(e => e.Url.Href == item.Url.Href).Count() == 0)
                    {
                        distinctResult.Add(item);
                    }
                }
                foreach (CrawlResult item in distinctResult)
                {
                    if (!await db.News.AnyAsync(N => N.SourceLink == item.Url.Href))
                    {
                        var source = db.CrawlSources.Find(new object[] { stepper.CrawlSourceId });
                        News newsEntry = new News
                        {
                            Title = item.CrawlItems.Where(x => x.Name == "Title").FirstOrDefault()?.Value,
                            Thumb = item.Thumb?.Href,
                            SourceLink = item.Url.Href,
                            Created = DateTime.Now,
                            SourceId = source.Id,
                            CountryId = source.CountryId
                        };
                        await db.News.AddAsync(newsEntry);
                        await db.SaveChangesAsync();

                        if (newsEntry.Id > 0)
                        {
                            // Add the Main Category to the News Item Category
                            if ((int)stepper.CategoryId > 0)
                            {
                                await db.NewsCategories.AddAsync(new NewsCategory() { Id = 0, NewsId = newsEntry.Id, CategoryId = (int)stepper.CategoryId, Main = true });
                                await db.SaveChangesAsync();
                            }

                            // Add all the News Items
                            foreach (var x in item.CrawlItems)
                            {
                                NewsItem nItem = new NewsItem
                                {
                                    NewsId = newsEntry.Id,
                                    Name = x.Name,
                                    Value = x.Value
                                };
                                if (nItem.Name == "Category")
                                {
                                    int cat = 0;
                                    if (int.TryParse(nItem.Value, out cat))
                                    {
                                        await db.NewsCategories.AddAsync(new NewsCategory() { Id = 0, NewsId = newsEntry.Id, CategoryId = cat, Main = false });
                                        await db.SaveChangesAsync();
                                    }
                                }
                                else
                                {
                                    db.NewsItems.Add(nItem);
                                }
                            }

                            db.SaveChanges();
                        }

                    }
                    else
                    {
                        News oldNews = await db.News.Include(e => e.NewsCategories).Where(N => N.SourceLink == item.Url.Href).FirstOrDefaultAsync();
                        if (oldNews.Id > 0)
                        {

                            foreach (var cat in item.Categories)
                            {
                                bool _main = false;

                                // Add the new categories to the existing news if not exists
                                if (!await db.NewsCategories.AnyAsync(NC => NC.NewsId == oldNews.Id && NC.CategoryId == cat))
                                {
                                    if (oldNews.NewsCategories.ToList().Any(NC => NC.Category.Name == "أحدث الأخبار" && NC.Main))
                                    {
                                        _main = true;
                                    }

                                    //If relation not exists Add it or Update it if exists
                                    if (!db.NewsCategories.ToList().Any(NC => NC.NewsId == oldNews.Id && NC.CategoryId == cat))
                                    {
                                        await db.NewsCategories.AddAsync(new NewsCategory { NewsId = oldNews.Id, CategoryId = cat, Main = _main });
                                    }

                                }
                                else
                                {
                                    try
                                    {
                                        var relation = db.NewsCategories.ToList().Where(NC => NC.CategoryId == cat && NC.NewsId == oldNews.Id).First();
                                        if (relation != null)
                                        {
                                            relation.Main = _main;
                                            db.Entry<NewsCategory>(relation).State = EntityState.Modified;
                                            db.Attach<NewsCategory>(relation);
                                        }
                                    }
                                    catch (Exception) { }
                                }
                                await db.SaveChangesAsync();
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

            }


        }

    }
}



//  public void CrawlSourceToDatabase2(CrawlSource src, ApplicationDbContext db)
//{
//    src.CrawlStepper.ToList().ForEach(stepper =>
//    {
//        if (stepper.Enabled)
//        {
//            var stepperEng = new eqranews.crawling.Models.CrawlStepper();
//            List<eqranews.crawling.Models.CrawlResult> results = new List<eqranews.crawling.Models.CrawlResult>();
//            stepper.CrawlSteps.ToList().ForEach(step =>
//            {

//                List<eqranews.crawling.Models.CrawlItem> CrawlItems = new List<eqranews.crawling.Models.CrawlItem>();

//                var newParams = new object[] { step.Id, crawling.Models.CrawlSteps.CrawlSetpType.Single, new AngleSharp.Url(step.Url), step.Selector };

//                step.CrawlItems.ToList().ForEach(item =>
//                {
//                    CrawlItems.Add(new eqranews.crawling.Models.CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr, Value = item.Value });
//                });


//                string StepClassFullName = String.Format("eqranews.crawling.Models.CrawlSteps.{0}, eqranews.crawling, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", step.CrawlStepType.Name);
//                Type t = Type.GetType(StepClassFullName);
//                if (t == null) return;


//                var instance = (eqranews.crawling.Models.CrawlSteps.CrawlStep)Activator.CreateInstance(t, newParams);
//                var myPropInfo = t.GetProperty("CrawlItems");
//                myPropInfo.SetValue(instance, CrawlItems);

//                // var instance = (CrawlStep)Activator.CreateInstance("eqranews.crawling", StepClassFullName, newParams);
//                // MethodInfo method = instance.GetType().GetMethod("Process", BindingFlags.Instance | BindingFlags.Public);
//                // // method.MakeGenericMethod(new[] { t });


//                // Add step to stepper
//                stepperEng.StepSequence.Add(instance);
//                // results = (List<CrawlResult>)method.Invoke(instance, new object[] { results });

//            });
//            results = stepperEng.Crawl();
//            SaveToStore(results, db, src);
//        }
//    });
//}
