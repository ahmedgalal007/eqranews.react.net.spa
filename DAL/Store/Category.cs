﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Store
{
    public class Category
    {
        public Category()
        {
            Childrens = new HashSet<Category>();
            Default = false;
            Color = "#ffffff";
            IsMenu = false;
            IsSlider = false;
            IsTiker = false;
            IsHome = false;

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Color { get; set; }
        public int Periority { get; set; }

        public bool Default { get; set; }
        public bool IsMenu { get; set; }
        public bool IsHome { get; set; }
        public bool IsSlider { get; set; }
        public bool IsTiker { get; set; }


        public int? ParentId { get; set; }
        public virtual Category Parent { get; set; }

        public virtual ICollection<Category> Childrens { get; set; }
        public virtual ICollection<NewsCategory> NewsCategories { get; set; }
    }
}
