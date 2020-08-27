using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Store
{
    public class NewsCategory
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int NewsId { get; set; }
        public virtual News News { get; set; }
    }
}
