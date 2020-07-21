using MaxMind.GeoIP2.Model;
using MaxMind.GeoIP2.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.geo
{
    public class GeoData
    {
        public GeoData(EnterpriseResponse res)
        {
            this.Country = res.Country;
            this.Subdivision = res.MostSpecificSubdivision;
            this.City = res.City;
            this.Postal = res.Postal;
            this.Location = res.Location;
        }
        public Country Country { get; set; }
        public Subdivision Subdivision { get; set; }
        public City City { get; set; }
        public Postal Postal { get; set; }
        public Location Location { get; set; }
    }
}
