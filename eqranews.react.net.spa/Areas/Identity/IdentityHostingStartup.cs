using System;
using eqranews.react.net.spa.Data;
using eqranews.react.net.spa.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(eqranews.react.net.spa.Areas.Identity.IdentityHostingStartup))]
namespace eqranews.react.net.spa.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                var ctx = context;
            });
        }
    }
}