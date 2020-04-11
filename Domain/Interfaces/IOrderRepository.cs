using DSO.DotnetCore.Domain.Entities;
using System.Collections.Generic;

namespace DSO.DotnetCore.Domain.Repositories
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll();
    }
}