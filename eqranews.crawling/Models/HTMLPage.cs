using System;
using System.Collections.Generic;
using System.Text;

namespace eqranews.crawling.Models
{
    public class HTMLPage
    {
        public string Href { get; set; }
        public string Title { get; set; }
        public string ImageURL { get; set; }
        public string Preif { get; set; }
        public string Body { get; set; }
        public string DateCreated { get; set; }
        public string Author { get; set; }
    }

    public enum HTMLPageContent
    {
        Href,
        Title,
        ImageURL,
        Preif,
        Body,
        DateCreated,
        Author,
    }
}
