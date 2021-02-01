using eqranews.crawling.Models;
using eqranews.crawling.Models.CrawlSteps;
using eqranews.react.net.spa.Data;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace eqranews.react.net.spa
{
    public class CrawlUtils
    {
        private static ApplicationDbContext db;
        private static IRecurringJobManager recurringJobManager;
        private static IBackgroundJobClient backgroundJobClient;
        private static Lazy<CrawlUtils> Lazy;
        public CrawlUtils(IServiceCollection services)
        {
            if (Lazy == null)
            {
                Lazy = new Lazy<CrawlUtils>(() => new CrawlUtils(services));

                db = services.BuildServiceProvider().GetRequiredService<ApplicationDbContext>();

                recurringJobManager = services.BuildServiceProvider().GetRequiredService<IRecurringJobManager>();
                backgroundJobClient = services.BuildServiceProvider().GetRequiredService<IBackgroundJobClient>();
            }
        }
        public static CrawlUtils Instance => Lazy.Value;

        public void createJobs()
        {
            string StepNamespace = "eqranews.crawling.Models.CrawlSteps";
            db.CrawlSources.ToList().ForEach(source =>
                source.CrawlStepper.ToList().ForEach(stepper =>
                {
                    if (stepper.Enabled)
                    {
                        var stepperEng = new eqranews.crawling.Models.CrawlStepper();
                        List<CrawlResult> results = new List<CrawlResult>();
                        stepper.CrawlSteps.ToList().ForEach(step =>
                        {

                            List<CrawlItem> CrawlItems = new List<CrawlItem>();

                            var newParams = new object[] { step.Id , CrawlSetpType.Single, new AngleSharp.Url(step.Url), step.Selector };
                            
                            step.CrawlItems.ToList().ForEach(item => {
                                CrawlItems.Add(new CrawlItem { Name= item.Name, Selector=item.Selector, Attr = item.Attr, Value = item.Value });
                            });

           
                            string StepClassFullName = StepNamespace + "." + step.CrawlStepType.Name;
                            Type t = Type.GetType(StepClassFullName);
                            var instance = (CrawlStep)Activator.CreateInstance(t, newParams);
                            var myPropInfo = t.GetProperty("CrawlItems");
                            myPropInfo.SetValue(instance, CrawlItems);

                            // var instance = (CrawlStep)Activator.CreateInstance("eqranews.crawling", StepClassFullName, newParams);
                            // MethodInfo method = instance.GetType().GetMethod("Process", BindingFlags.Instance | BindingFlags.Public);
                            // // method.MakeGenericMethod(new[] { t });


                            // Add step to stepper
                            stepperEng.StepSequence.Add(instance);
                                // results = (List<CrawlResult>)method.Invoke(instance, new object[] { results });

                        });
                        results = stepperEng.Crawl().Result;
                    }
                })
            );

            backgroundJobClient.Enqueue(() => Console.WriteLine("Hi from static file CRON JOB!! From :"));
            recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "(*/30 * * * * *");
        }
    }
}
