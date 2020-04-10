using DSO.DotnetCore.Domain.Core.Base;
using System;
using System.Collections.Generic;

namespace DSO.DotnetCore.Domain.Entities
{
    public class Order: BaseEntity
    {
        public string OrderNumber { get; set; }
        public string OrderBirthDate { get; set; }
        public ICollection<OrderItem> Items { get; set; }

    }
}

