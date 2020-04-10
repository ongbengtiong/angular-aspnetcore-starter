using DSO.DotnetCore.Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace DSO.DotnetCore.Domain
{
    public class DataSeeder : DbContext
    {
        private readonly DataContext _dataContext;
        private readonly IHostingEnvironment _env;

        public DataSeeder(DataContext dataContext, IHostingEnvironment env)
        {
            _dataContext = dataContext;
            _env = env;
        }


        public void Seed()
        {
            _dataContext.Database.EnsureCreated();

            if(!_dataContext.Products.Any())
            {
                var filePath = Path.Combine(_env .ContentRootPath, "SeedData/products.json");
                // var filePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "SeedData/products.json");
                var json = File.ReadAllText(filePath);
                var products = JsonConvert.DeserializeObject<IEnumerable<Product>>(json);
                _dataContext.Products.AddRange(products);

                var order = _dataContext.Orders.Where(o => o.Id == 1).FirstOrDefault();
                if (order != null)
                {
                    order.Items = new List<OrderItem>()
                    {
                        new OrderItem()
                        {
                            Product = products.First(),
                            Quantity = 5,
                            UnitPrice = products.First().Price
                        }

                    };
                }

                _dataContext.SaveChanges();


            }

        }
    }
}
