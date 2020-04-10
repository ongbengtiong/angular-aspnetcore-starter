 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DSO.DotnetCore.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using Newtonsoft.Json;
using DSO.DotnetCore.Domain.Entities;

namespace my_new_app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            RunSeeding(host);

            host.Run();
        }

        private static void RunSeeding(IHost host)
        {
            var scopeFactory = host.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory.CreateScope())
            {
                var seeder = scope.ServiceProvider.GetService<DataSeeder>();
                var env = host.Services.GetService<IHostingEnvironment>();
                var filePath = Path.Combine(env.ContentRootPath, "SeedData/products.json");
                // var filePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "SeedData/products.json");
                var json = File.ReadAllText(filePath);
                var products = JsonConvert.DeserializeObject<IEnumerable<Product>>(json);
                seeder.Seed(products);
            }
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
