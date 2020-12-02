using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public static class DataSeed
    {
        public static void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
                // scope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
                DataSeedIdentity.Seed(scope);
                DataSeedCategories.Seed(scope);
                DataSeedCountries.Seed(scope);
                DataSeedCrawlStepTypes.Seed(scope);
                DataSeedSources.Seed(scope);
                DataSeedSteppers.Seed(scope);
                DataSeedSteps.Seed(scope);
            }
            
            // }
        }
    }
}
