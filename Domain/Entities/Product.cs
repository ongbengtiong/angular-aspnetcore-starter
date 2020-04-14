﻿
using DSO.DotnetCore.Domain.Core.Base;
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
        public string ImageUrl { get; set; }
        public string ArtDescription { get; set; }
        public string ArtDating { get; set; }
        public string ArtId { get; set; }
        public string Artist { get; set; }
        public DateTime ArtistBirthDate { get; set; }
        public DateTime ArtistDeathDate { get; set; }
        public string ArtistNationality { get; set; }
    }
}
