using Domain.Core.Security;
using DSO.DotnetCore.Domain.Entities; 
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DSO.DotnetCore.Domain
{
    public class DataSeeder : DbContext
    {
        private readonly DataContext _dataContext;
        private readonly IHostingEnvironment _env;
        private readonly UserManager<User> _userManager;

        public DataSeeder(DataContext dataContext, IHostingEnvironment env, UserManager<User> userManager)
        {
            _dataContext = dataContext;
            _env = env;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            _dataContext.Database.EnsureCreated();

            User user = await _userManager.FindByEmailAsync("user-01@company.com");
            if (user == null)
            {

                user = new User()
                {
                    FirstName = "User",
                    LastName = "User-01",
                    Email = "user-01@company.com",
                    UserName = "user-01"
                };
                var result = await _userManager.CreateAsync(user, "ASDqwe123!@#");
                if (result!=IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create new user in seeder");
                }
            }

            if (!_dataContext.Products.Any())
            {
                var filePath = Path.Combine(_env.ContentRootPath, "SeedData/products.json");
                // var filePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "SeedData/products.json");
                var json = File.ReadAllText(filePath);
                var products = JsonConvert.DeserializeObject<IEnumerable<Product>>(json);
                _dataContext.Products.AddRange(products);


                var order = new Order()
                {
                    OrderNumber = "X123",
                    OrderDate = DateTime.Now
                };
                _dataContext.Orders.Add(order);

                // var order = _dataContext.Orders.Where(o => o.Id == 1).FirstOrDefault();
                if (order != null)
                {
                    order.User = user;
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