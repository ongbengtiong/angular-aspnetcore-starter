using DSO.DotnetCore.Domain.Core.Base;
using DSO.DotnetCore.Domain.Entities;

namespace DSO.DotnetCore.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public Order Order { get; set; }


    }
}