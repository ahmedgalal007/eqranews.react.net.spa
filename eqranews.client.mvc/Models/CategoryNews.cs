﻿using DAL.Crawling;
using DAL.Store;
using System.Collections.Generic;

namespace eqranews.client.mvc.Models
{
    public class CategoryNews
    {
        public Category Category { get; set; }
        public List<News> News { get; set; }

        public int TotalPages { get; set; }
        public int Page { get; set; }

    }
}
