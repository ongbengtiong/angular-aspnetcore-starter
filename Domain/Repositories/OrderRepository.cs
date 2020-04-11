using Domain.Core.Repositories;
using DSO.DotnetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DSO.DotnetCore.Domain.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _dataContext;

        public OrderRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
    

        public IEnumerable<Order> GetAll()
        {
            return _dataContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i=>i.Product)
                .ToList();
        }

    
    }
}
