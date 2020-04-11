using Domain.Core.Repositories;
using DSO.DotnetCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DSO.DotnetCore.Domain.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private readonly DataContext _dataContext;

        public ProductRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }
        public IEnumerable<Product> GetAllByCategory(string category)
        {
            return _dataContext.Products.Where(p => p.Category == category).ToList();
        }

        public override IEnumerable<Product> GetAll()
        {
            return _dataContext.Products.ToList();
        }

        public override Product Get(int id)
        {
            return _dataContext.Products
                .Find(id);
        }
    }
}
