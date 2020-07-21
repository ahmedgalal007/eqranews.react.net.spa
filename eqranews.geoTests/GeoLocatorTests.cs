using Xunit;
using eqranews.geo;
using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.geo.Tests
{
    public class GeoLocatorTests
    {
        public GeoLocatorTests()
        {
            GeoLocator.SetCityDbPath("../../../../eqranews.geo/GeoDb/GeoLite2-City.mmdb");
            GeoLocator.SetCountryPath("../../../../eqranews.geo/GeoDb/GeoLite2-Country.mmdb");
        }

        //[Fact()]
        //public void GetEnterpriseTest()
        //{
        //    Assert.True(false, "This test needs an implementation");
        //}

        [Fact()]
        public void GetCityTest()
        {
            
            var res = GeoLocator.GetCity("156.205.192.88");
            Assert.True(res.City.Name == "Cairo", $"City Incorrect -> {res.City.Name}");
        }

        [Fact()]
        public void GetCountryEgyptTest()
        {
            var res = GeoLocator.GetCountry("156.205.192.88");
            Assert.True(res.Country.IsoCode == "EG", "Country are Incorrect");
        }

        [Fact()]
        public void GetCountrySaudiTest()
        {
            var res = GeoLocator.GetCountry("45.135.115.234");
            Assert.True(res.Country.IsoCode == "SA", $"Country are Incorrect -> {res.Country.IsoCode}");
        }

    }
}

namespace eqranews.geoTests
{
    class GeoLocatorTests
    {
    }
}
