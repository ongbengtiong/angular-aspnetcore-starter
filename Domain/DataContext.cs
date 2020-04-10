using DSO.DotnetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace DSO.DotnetCore.Domain
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
      : base(options)
        {
        }



        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }
            /*
            _ = modelBuilder.Entity<Product>().HasData(new Product()
            {
                Id = 1,
                ArtistBirthDate = DateTime.UtcNow,
                Title = "OG Title of the URL",
                Artist = "Artist01",
                ImageUrl = "https://example.com/sample.png"
            });
            */
        }
    }
}
