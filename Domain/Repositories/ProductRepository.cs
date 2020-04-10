using Domain.Core.Repositories;
using DSO.DotnetCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DSO.DotnetCore.Domain.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _dataContext;

        public ProductRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public IEnumerable<Product> GetAllByCategory(string category)
        {
            return _dataContext.Products.Where(p => p.Category == category).ToList();
        }

        public IEnumerable<Product> GetAll()
        {
            return _dataContext.Products.ToList();
        }

    
    }
}
