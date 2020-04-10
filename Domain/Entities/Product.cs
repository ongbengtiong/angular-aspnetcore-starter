
using System;
using System.Collections.Generic;
using System.Text;

namespace DSO.DotnetCore.Domain.Entities
{
    public class Product : BaseEntity
    { 
        public string Category { get; set; }
        public string Size { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public string ArtId { get; set; }
        public string Artist { get; set; }
        public string ImageUrl{ get; set; }
        public DateTime ArtistBirthDate { get; set; }
    }
}
