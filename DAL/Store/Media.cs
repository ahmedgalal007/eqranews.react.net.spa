using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Store
{
    public class Media
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Mime { get; set; }
        public string Path { get; set; }
        public string Keywords { get; set; }
        public string SourceUrl { get; set; }
    }
}
