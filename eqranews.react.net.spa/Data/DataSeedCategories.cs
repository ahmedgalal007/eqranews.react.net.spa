using DAL.Store;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eqranews.react.net.spa.Data
{
    public class DataSeedCategories
    {
        public static void Seed(IServiceScope scope)
        {
            var _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var _categories = new List<Category> {
                new Category { Name="أحدث الأخبار", Color="#ffffff", Default=false, IsTiker=true, IsHome=true },
                new Category { Name="Slider", Color="#ffffff", Default=false, IsHome=true },
                new Category { Name="سياسة", Color="#fe2c48", Default=false, IsHome=true, IsMenu =true, Periority=1 },
                new Category { Name="إقتصاد", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=2 },
                new Category { Name="رياضة", Color="#42f49c", Default=false , IsHome=true, IsMenu =true, Periority=3 },
                new Category { Name="تكنولوجيا", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=4  },
                new Category { Name="منوعات", Color="#2cfeaf", Default=true, IsHome=true, IsMenu =true , Periority=5 },
                new Category { Name="تحقيقات", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=6  },
                new Category { Name="فنون", Color="#f43f36", Default=false, IsHome=true, IsMenu =true , Periority=7 },
                new Category { Name="صحة وجمال", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=8  },
                new Category { Name="فكر وثقافة", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=9  },
                new Category { Name="حوادث", Color="#ffffff", Default=false, IsHome=true, IsMenu =true, Periority=10 },
            };
            foreach (var cat in _categories)
            {
                if (!_db.Categories.Any(C => C.Name == cat.Name))
                {
                    _db.Categories.Add(cat);
                };
            }
            _db.SaveChanges();
        }
    }
}
