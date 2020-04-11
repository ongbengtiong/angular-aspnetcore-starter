using DSO.DotnetCore.Domain.Core.Base;
using System;
using System.Collections.Generic;

namespace DSO.DotnetCore.Domain.Entities
{
    public class Order: BaseEntity
    { 
        public DateTime OrderDate { get; set; }
        public string OrderNumber { get; set; } 
        public ICollection<OrderItem> Items { get; set; }

    }
}

