using DAL.Crawling;
using DAL.Geo;
using DAL.Store;
using eqranews.geo;
using eqranews.react.net.spa.Data;
using MaxMind.GeoIP2.Responses;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Http.Features;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Middlewares
{
    public class GeoMiddleware
    {
        private RequestDelegate _next;
        private readonly List<CrawlSource> _CrawlSources;
        private readonly List<Country> _DalCountries;
        private readonly List<Category> _Categories;

        public GeoMiddleware(RequestDelegate next, List<CrawlSource> CrawlSources, List<Country> DalCountries, List<Category> Categories)
        {
            _next = next;
            _CrawlSources = CrawlSources;
            _DalCountries = DalCountries;
            _Categories = Categories;
        }
        public async Task Invoke(HttpContext context)
        {
            List<CountryResponse> countries = new List<CountryResponse>();
            var ClientIP = context.Request.HttpContext.Connection.RemoteIpAddress;
            // var ExecDir = System.Diagnostics.Process.GetCurrentProcess().MainModule;
            var rootDir = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase).TrimStart("file:\\".ToCharArray());
            Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
            var appRoot = appPathMatcher.Match(rootDir).Value;
            var root = rootDir.TrimStart(appRoot.ToCharArray()).Replace("\\", "/");
            GeoLocator.SetCountryPath($"./{root}/GeoDb/GeoLite2-Country.mmdb");
            if (ClientIP.IsIPv6LinkLocal || ClientIP.IsIPv6SiteLocal)
            {
                countries.Add(GeoLocator.GetCountry(ClientIP));
            }
            else if(ClientIP.IsIPv6Multicast || ClientIP.IsIPv6Teredo || ClientIP.IsIPv4MappedToIPv6
            ) 
            {
                countries.Add(GeoLocator.GetCountry(ClientIP));
            }
            else
            {
                // var httpConnectionFeature = context.Request.HttpContext.Features.Get<IHttpConnectionFeature>();
                // var localIpAddress = httpConnectionFeature?.LocalIpAddress;
                var ips = await System.Net.Dns.GetHostAddressesAsync(System.Net.Dns.GetHostName());
                //countries.Add(GeoLocator.GetCountry(ips.Where(e => e.AddressFamily != System.Net.Sockets.AddressFamily.InterNetworkV6).Last()));
            }
            // context.Session.Set("CountryResponse", Encoding.UTF32.GetBytes(JsonConvert.SerializeObject(countries)));
            context.Items["CountryResponse"]= countries;
            context.Items["Countries"] = _DalCountries;
            context.Items["Sources"] = _CrawlSources;
            context.Items["Categories"] = _Categories;
            await _next(context);
        }
    }
}
