using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace eqranews.react.net.spa
{
    public class Program
    {

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //var configuration = new ConfigurationBuilder()
                    //    .AddJsonFile("appsettings.json", optional: false)
                    //    .Build();
                    webBuilder
                            //.UseKestrel(opts =>
                            //{
                            //    opts.Listen(IPAddress.Loopback, 5000);
                            //    opts.Listen(IPAddress.Loopback, 5001, listenOptions =>
                            //    {
                            //        listenOptions.UseHttps(
                            //            new X509Certificate2(configuration["certificate:ssl"])
                            //        );
                            //    });
                            //})
                            .UseKestrel()
                            .UseContentRoot(Directory.GetCurrentDirectory())
                            .UseUrls("http://*:44377")
                            .UseStartup<Startup>();
                });
    }
}
