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
                new Category { Name="سياسة", Color="#fe2c48", Default=false },
                new Category { Name="إقتصاد", Color="#ffffff", Default=false },
                new Category { Name="رياضة", Color="#42f49c", Default=false },
                new Category { Name="تكنولوجيا", Color="#ffffff", Default=false },
                new Category { Name="منوعات", Color="#2cfeaf", Default=true },
                new Category { Name="تحقيقات", Color="#ffffff", Default=false },
                new Category { Name="فنون", Color="#f43f36", Default=false },
                new Category { Name="صحة وجمال", Color="#ffffff", Default=false },
                new Category { Name="فكر وثقافة", Color="#ffffff", Default=false },
                new Category { Name="حوادث", Color="#ffffff", Default=false }
            };
            foreach (var cat in _categories)
            {
                if (!_db.Categories.Any(C => C.Name == cat.Name)) {
                    _db.Categories.Add(cat);
                };
            }
            _db.SaveChanges();
        }
    }
}
