using DSO.DotnetCore.Domain.Core.Interfaces.Repositories;
using DSO.DotnetCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Core.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        IEnumerable<Product> GetAllByCategory(string category);
    }
}
