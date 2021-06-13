using System;
using System.Collections.Generic;
using System.Security;
using System.Text;

namespace DAL.Store
{
    public class AdBlocks
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public string CodeTxt { get; set; } = "";
        public string Placement { get; set; } = "";
    }
}
