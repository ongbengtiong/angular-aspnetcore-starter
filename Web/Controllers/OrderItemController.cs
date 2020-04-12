using AutoMapper;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Domain.Repositories;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DSO.DotnetCore.Web.Controllers
{
    [Route("api/orders/{orderId}/items")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly ILogger<OrderItemController> _logger;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;

        public OrderItemController(ILogger<OrderItemController> logger, IMapper mapper, IOrderRepository orderRepository)
        {
            _logger = logger;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult GetAll(int orderId)
        {
            try
            {
                var userName = User.Identity.Name;
                var result = _orderRepository.GetByUser(userName, orderId);
                if (result != null)
                {
                    return Ok(_mapper.Map<IEnumerable<OrderItem>, IEnumerable<OrderItemViewModel>>(result.Items));
                }
                else
                {
                    _logger.LogInformation("NotFound");
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
            }
            return BadRequest("Failed");
        }
        [HttpGet("{id:int}")]
        public IActionResult GetAll(int orderId, int id)
        {
            try
            {
                var result = _orderRepository.Get(orderId);
                if (result != null)
                {
                    var item = result.Items.Where(i => i.Id == id).FirstOrDefault();
                    if (item != null)
                    {
                        return Ok(_mapper.Map<OrderItem, OrderItemViewModel>(item));
                    }

                }

                _logger.LogInformation("NotFound");
                return NotFound();

            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
            }
            return BadRequest("Failed");
        }




    }
}