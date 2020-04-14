using System;
using System.ComponentModel.DataAnnotations;

namespace DSO.DotnetCore.Web.ViewModels
{
    public class ProductViewModel
    {
        public int? ProductId { get; set; }
        public string? Category { get; set; }
        public string? Size { get; set; }
        public decimal Price { get; set; }
        [Required]
        public string Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? ArtDescription { get; set; }
        public string? ArtDating { get; set; }
        public string? ArtId { get; set; }
        public string? Artist { get; set; }
        public DateTime? ArtistBirthDate { get; set; }
        public DateTime? ArtistDeathDate { get; set; }
        public string? ArtistNationality { get; set; }
    }
}