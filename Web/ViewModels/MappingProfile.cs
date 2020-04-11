using AutoMapper;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Web.ViewModels;
using my_new_app.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DSO.DotnetCore.Web.ViewModels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Order, OrderViewModel>()
                .ForMember(o => o.OrderId, ex => ex.MapFrom(o => o.Id))
                .ReverseMap();
            CreateMap<OrderItem, OrderItemViewModel>();
            CreateMap<Product, ProductViewModel>()
                .ForMember(o => o.ProductId, ex => ex.MapFrom(o => o.Id))
                .ReverseMap();
        }

    }
}
