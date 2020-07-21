using MaxMind.GeoIP2;
using MaxMind.GeoIP2.Model;
using MaxMind.GeoIP2.Responses;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace eqranews.geo
{
    public static class GeoLocator
    {
        private static string _EnterpriseDbPath;
        private static string _CityDbPath;
        private static string _CountryDbPath;

        public static GeoData GetEnterprise(string ClientIP)
        {
            using (var reader = new DatabaseReader(_EnterpriseDbPath))
            {
                return new GeoData(reader.Enterprise(ClientIP));
                ////  Use the Enterprise(ip) method to do a lookup in the Enterprise database
                //var response = reader.Enterprise(ClientIP);

                //var country = response.Country;
                //Console.WriteLine(country.IsoCode);            // 'US'
                //Console.WriteLine(country.Name);               // 'United States'
                //Console.WriteLine(country.Names["zh-CN"]);     // '美国'
                //Console.WriteLine(country.Confidence);         // 99

                //var subdivision = response.MostSpecificSubdivision;
                //Console.WriteLine(subdivision.Name);           // 'Minnesota'
                //Console.WriteLine(subdivision.IsoCode);        // 'MN'
                //Console.WriteLine(subdivision.Confidence);     // 77

                //var city = response.City;
                //Console.WriteLine(city.Name);       // 'Minneapolis'
                //Console.WriteLine(city.Confidence); // 11

                //var postal = response.Postal;
                //Console.WriteLine(postal.Code); // '55455'
                //Console.WriteLine(postal.Confidence); // 5

                //var location = response.Location;
                //Console.WriteLine(location.Latitude);       // 44.9733
                //Console.WriteLine(location.Longitude);      // -93.2323
                //Console.WriteLine(location.AccuracyRadius); // 50
            }
        }

        public static CityResponse GetCity(string ClientIP)
        {
            // This creates the DatabaseReader object, which should be reused across
            // lookups.
            using (var reader = new DatabaseReader(_CityDbPath))
            {
                // Replace "City" with the appropriate method for your database, e.g.,
                // "Country".
                return reader.City(ClientIP);

                //Console.WriteLine(city.Country.IsoCode); // 'US'
                //Console.WriteLine(city.Country.Name); // 'United States'
                //Console.WriteLine(city.Country.Names["zh-CN"]); // '美国'

                //Console.WriteLine(city.MostSpecificSubdivision.Name); // 'Minnesota'
                //Console.WriteLine(city.MostSpecificSubdivision.IsoCode); // 'MN'

                //Console.WriteLine(city.City.Name); // 'Minneapolis'

                //Console.WriteLine(city.Postal.Code); // '55455'

                //Console.WriteLine(city.Location.Latitude); // 44.9733
                //Console.WriteLine(city.Location.Longitude); // -93.2323
            }
        }

        public static CountryResponse GetCountry(string ClientIP)
        {
            // This creates the DatabaseReader object, which should be reused across
            // lookups.
            using (var reader = new DatabaseReader(_CountryDbPath))
            {
                // Replace "City" with the appropriate method for your database, e.g.,
                // "Country".
                return reader.Country(ClientIP);

                //Console.WriteLine(city.Country.IsoCode); // 'US'
                //Console.WriteLine(city.Country.Name); // 'United States'
                //Console.WriteLine(city.Country.Names["zh-CN"]); // '美国'

                //Console.WriteLine(city.MostSpecificSubdivision.Name); // 'Minnesota'
                //Console.WriteLine(city.MostSpecificSubdivision.IsoCode); // 'MN'

                //Console.WriteLine(city.City.Name); // 'Minneapolis'

                //Console.WriteLine(city.Postal.Code); // '55455'

                //Console.WriteLine(city.Location.Latitude); // 44.9733
                //Console.WriteLine(city.Location.Longitude); // -93.2323
            }
        }

        public static void SetEnterpriseDbPath(string path)
        {
            _EnterpriseDbPath = path;
        }
        public static void SetCityDbPath(string path)
        {
            _CityDbPath = path;
        }
        public static void SetCountryPath(string path)
        {
            _CountryDbPath = path;
        }

    }
}
