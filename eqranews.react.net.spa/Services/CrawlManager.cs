using eqranews.crawling.Models;
using eqranews.crawling.Models.CrawlSteps;
using eqranews.react.net.spa.Data;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Services
{
    public class CrawlManager : ICrawlManager
    {
        private ApplicationDbContext db;
        private IBackgroundJobClient backgroundJobClient;
        private IRecurringJobManager recurringJobManager;

        public CrawlManager(IServiceProvider serviceProvider)
        {


        }

        public void CreateEnabledSourcesJobs(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                this.db = services.GetRequiredService<ApplicationDbContext>();
                this.backgroundJobClient = services.GetRequiredService<IBackgroundJobClient>();
                this.recurringJobManager = services.GetRequiredService<IRecurringJobManager>();
                db.CrawlSources.ToList();
                backgroundJobClient.Enqueue(() => Console.WriteLine("Hello From CrawlManager"));
                recurringJobManager.AddOrUpdate("Run Every Minute", () => Console.WriteLine("Test Recuring Job !!!"), "* * * * *");

                createJobs(this.db);
            }
        }

        public void createJobs(ApplicationDbContext db)
        {
             db.CrawlSources.Include(x => x.CrawlStepper).ThenInclude(s => s.CrawlSteps).ThenInclude( i => i.CrawlItems ).Include("CrawlStepper.CrawlSteps.CrawlStepType").ToList().ForEach(source => {
                source.CrawlStepper.ToList().ForEach(stepper =>
                {
                    if (stepper.Enabled)
                    {
                        var stepperEng = new eqranews.crawling.Models.CrawlStepper();
                        List<CrawlResult> results = new List<CrawlResult>();
                        stepper.CrawlSteps.ToList().ForEach(step =>
                        {

                            List<CrawlItem> CrawlItems = new List<CrawlItem>();

                            var newParams = new object[] { step.Id, CrawlSetpType.Single, new AngleSharp.Url(step.Url), step.Selector };

                            step.CrawlItems.ToList().ForEach(item =>
                            {
                                CrawlItems.Add(new CrawlItem { Name = item.Name, Selector = item.Selector, Attr = item.Attr, Value = item.Value });
                            });


                            string StepClassFullName = String.Format("eqranews.crawling.Models.CrawlSteps.{0}, eqranews.crawling, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", step.CrawlStepType.Name);
                            Type t = Type.GetType(StepClassFullName);
                            if (t == null) return;
                          
                            
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
                        results = stepperEng.Crawl();
                    }
                });
            }) ;
        }
    }
}
