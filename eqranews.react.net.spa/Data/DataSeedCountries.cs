using DAL.Geo;
using DAL.Store;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedCountries
    {
        public static void Seed(IServiceScope scope)
        {
            var _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var _countries = new List<Country> {
                new Country {Name="مصر", IsoCode="EG" },
                new Country {Name="السعودية", IsoCode="SA" },
                new Country {Name="الامارات", IsoCode="UAE" },
                new Country {Name="اليمن", IsoCode="YEM" },
            };
            foreach (var country in _countries)
            {
                if (!_db.Countries.Any(C => C.IsoCode == country.IsoCode))
                {
                    _db.Countries.Add(country);
                };
            }
            _db.SaveChanges();
        }
    }
}
