using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Store
{
    public class NewsItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int NewsId { get; set; }
        public virtual News News { get; set; }
    }
}
