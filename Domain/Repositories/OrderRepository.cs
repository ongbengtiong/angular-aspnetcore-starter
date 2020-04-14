using DSO.DotnetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DSO.DotnetCore.Domain.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly DataContext _dataContext;

        public OrderRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<Order> GetAll(bool includeItems = true)
        {
            IQueryable<Order> query = _dataContext.Orders;
            if (includeItems)
            {
                query = query.Include(o => o.Items)
                    .ThenInclude(i => i.Product);
            }
            return query
                     .ToList();

            //return query.ToList();
        }
        public override IEnumerable<Order> GetAll(string sort)
        {
            return GetAll(true);
        }

        public override Order Get(int id)
        {
            return _dataContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(o => o.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<Order> GetAllByUser(string userName, bool includeItems)
        {
            IQueryable<Order> query = _dataContext.Orders;
            if (includeItems)
            {
                query = query.Include(o => o.Items)
                    .ThenInclude(i => i.Product);
            }
            return query
                .Where(o => o.User.UserName == userName)
                .ToList();
        }

        public Order GetByUser(string userName, int id)
        {
            return _dataContext.Orders
                 .Include(o => o.Items)
                 .ThenInclude(i => i.Product)
                 .Where(o => o.Id == id)
                 .Where(o => o.User.UserName == userName)
                 .FirstOrDefault();
        }

        public void AddOrder(Order newEntity)
        {
            foreach (var item in newEntity.Items)
            {
                item.Product = _dataContext.Products.Find(item.Product.Id);
            }
            Add(newEntity);
        }
    }
}