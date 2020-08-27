using DAL.Crawling;
using DAL.Store;
using eqranews.crawling.Models;
using eqranews.crawling.Models.CrawlSteps;
using eqranews.react.net.spa.Data;
using Hangfire;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
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
        public static IApplicationBuilder builder;
        private IBackgroundJobClient backgroundJobClient;
        private IRecurringJobManager recurringJobManager;

        public CrawlManager(IServiceProvider serviceProvider)
        {
            //this.db = serviceProvider.GetRequiredService<ApplicationDbContext>();
            //this.backgroundJobClient = serviceProvider.GetRequiredService<IBackgroundJobClient>();
            //this.recurringJobManager = serviceProvider.GetRequiredService<IRecurringJobManager>();
        }

        public void CreateEnabledSourcesJobs(IApplicationBuilder app)
        {
            builder = app;
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                ApplicationDbContext db = services.GetRequiredService<ApplicationDbContext>();
                this.backgroundJobClient = services.GetRequiredService<IBackgroundJobClient>();
                this.recurringJobManager = services.GetRequiredService<IRecurringJobManager>();
                db.CrawlSources.ToList();
                backgroundJobClient.Enqueue(() => Console.WriteLine("Hello From CrawlManager"));
                recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "* * * * *");

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
                        manager.AddOrUpdate(source.Name, () => CrawlStepperToDatabase(stepper.Id), "*/" + 3 + " * * * *");
                    }
                }
            };
        }


        public void CrawlStepperToDatabase(int Id)
        {

            var stepperEng = new eqranews.crawling.Models.CrawlStepper();
            List<eqranews.crawling.Models.CrawlResult> results = new List<eqranews.crawling.Models.CrawlResult>();

            using (var scope = CrawlManager.builder.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                ApplicationDbContext db = services.GetRequiredService<ApplicationDbContext>();
                if(db.CrawlSteppers.Where(x => x.Id == Id).Any())
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
                    results = stepperEng.Crawl();
                    SaveToStore(results, db, stepper);
                }
                
            }

        }

      

        // Save the results in the database
        public void SaveToStore(List<CrawlResult> results, ApplicationDbContext db, DAL.Crawling.CrawlStepper stepper)
        {
            try
            {
                foreach (CrawlResult item in results)
                {
                    if (!db.News.Any(N => N.SourceLink == item.Url.Href))
                    {
                        var source = db.CrawlSources.Find(new object[] { stepper.CrawlSourceId });
                        News newsEntry = new News
                        {
                            Title = item.CrawlItems.Where(x => x.Name == "Title").FirstOrDefault().Value,
                            SourceLink = item.Url.Href,
                            Created = DateTime.Now,
                            SourceId = source.Id,
                            CountryId = source.CountryId
                        };
                        db.News.Add(newsEntry);
                        db.SaveChanges();

                        if (newsEntry.Id > 0)
                        {
                            foreach (var x in item.CrawlItems)
                            {
                                NewsItem nItem = new NewsItem
                                {
                                    NewsId = newsEntry.Id,
                                    Name = x.Name,
                                    Value = x.Value
                                };
                                db.NewsItems.Add(nItem);
                            }

                            db.SaveChanges();
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
