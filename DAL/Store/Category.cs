using System;
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
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Color { get; set; }
        public bool Default { get; set; }
        public int? ParentId { get; set; }
        public virtual Category Parent { get; set; }

        public virtual ICollection<Category> Childrens { get; set; }
        public virtual ICollection<NewsCategory> NewsCategories { get; set; }
    }
}
