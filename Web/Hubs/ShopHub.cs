using AutoMapper;
using Domain.Core.Security;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Domain.Repositories;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DSO.DotnetCore.Web.Hubs
{

    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ShopHub : Hub
    {
        private readonly ILogger<ShopHub> _logger;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        private readonly UserManager<User> _userManager;

        public ShopHub(ILogger<ShopHub> logger, IMapper mapper, IOrderRepository orderRepository, UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userManager = userManager;
        }

        public async Task GetProductOrdersUpdate(int productId)
        {
            
            do
            {
                //var result = __orderRepository.GetAllByProduct(productId);
                Thread.Sleep(1000);
                await Clients.All.SendAsync("ReceiveProductOrdersUpdate", DateTime.Now);
            } while (true);

        }
    }
}