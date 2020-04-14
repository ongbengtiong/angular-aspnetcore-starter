using DSO.DotnetCore.Domain.Core.Interfaces.Repositories;
using DSO.DotnetCore.Domain.Entities;
using System.Collections.Generic;

namespace DSO.DotnetCore.Domain.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        IEnumerable<Order> GetAll(bool includeItems);
        IEnumerable<Order> GetAllByUser(string userName, bool includeItems);
        Order GetByUser(string userName, int id);
        void AddOrder(Order newEntity);
    }
}