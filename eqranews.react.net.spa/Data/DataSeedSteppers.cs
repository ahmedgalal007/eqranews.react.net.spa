using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedSteppers
    {
        private static ApplicationDbContext _db;
        public static void Seed(IServiceScope scope)
        {
            _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var _steppers = new List<CrawlStepper> {
                new CrawlStepper {Name="عكاظ_سياسة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_رياضة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_إقتصاد", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_فنون", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_منوعات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_تكنولوجيا", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="عكاظ_تحقيقات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                new CrawlStepper {Name="المدينة_سياسة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_رياضة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_إقتصاد", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_فنون", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_منوعات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_تكنولوجيا", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_تحقيقات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_فكر وثقافة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="المدينة_صحة وجمال", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                new CrawlStepper {Name="الإمارات اليوم_سياسة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_رياضة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_إقتصاد", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_فنون", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_منوعات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_تكنولوجيا", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_تحقيقات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_صحة وجمال", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_فكر وثقافة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="الإمارات اليوم_حوادث", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                new CrawlStepper {Name="البيان_سياسة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_رياضة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_إقتصاد", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_فنون", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_منوعات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_تكنولوجيا", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_تحقيقات", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_صحة وجمال", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_فكر وثقافة", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },
                new CrawlStepper {Name="البيان_حوادث", CrawlSourceId=0, CategoryId=0, RecuringTime=TimeSpan.FromMinutes(3), Enabled=false },

            };

            SetSourcesCountryByList(_steppers);
            foreach (var stepper in _steppers)
            {
                if (!_db.CrawlSteppers.Any(C => C.Name == stepper.Name))
                {
                    _db.CrawlSteppers.Add(stepper);
                };
            }
            _db.SaveChanges();
        }

        private static void SetSourcesCountryByList(List<CrawlStepper> steppers)
        {
            foreach (var stepper in steppers)
            {
                var names = stepper.Name.Split('_');
                if (_db.CrawlSources.Any(S => S.Name == names[0]))
                {
                    stepper.CrawlSourceId = _db.CrawlSources.Where(S => S.Name == names[0]).First().Id;
                }

                if (_db.Categories.Any(C => C.Name == names[1]))
                {
                    stepper.CategoryId = _db.Categories.Where(C => C.Name == names[1]).First().Id;
                }
            }
        }
    }
}
