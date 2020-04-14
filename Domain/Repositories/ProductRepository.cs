using Domain.Core.Repositories;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Domain.Helpers;
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

        public override IEnumerable<Product> GetAll(string sort)
        {
            return _dataContext.Products
                .ApplySort(sort);
        }

        public override Product Get(int id)
        {
            return _dataContext.Products
                .Find(id);
        }


        public bool Delete(int id)
        {
            try
            {
                var exp = this.Get(id);
                if (exp != null)
                {
                    _dataContext.Products.Remove(exp);
                    _dataContext.SaveChanges();
                    return true;
                }
                throw new Exception("Not Found");
            }
            catch (Exception ex)
            {
                throw new Exception("Repository Error", ex);
            }
        }
    }
}
