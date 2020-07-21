using eqranews.react.net.spa.Data;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa
{
    public class EqranewsDbContextFactory: IDesignTimeDbContextFactory<ApplicationDbContext>
{
  
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            string CONN_STRING = $"server={Environment.GetEnvironmentVariable("MYSQL_HOST")};" +
                            $"port={Environment.GetEnvironmentVariable("MYSQL_TCP_PORT")};" +
                            $"user={Environment.GetEnvironmentVariable("MYSQL_USER")};" +
                            $"password={Environment.GetEnvironmentVariable("MYSQL_PASSWORD")};" +
                            $"database={Environment.GetEnvironmentVariable("MYSQL_DATABASE")}";

            IServiceCollection services = new ServiceCollection();


            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(CONN_STRING));
            services.Configure<IdentityServer4.EntityFramework.Options.OperationalStoreOptions>(x => { });

            var context = services.BuildServiceProvider().GetService<ApplicationDbContext>();

            return context;
        }
    }
}
