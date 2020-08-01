using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Store
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int? ParentId { get; set; }
        public virtual Category Parent { get; set; }
    }
}
