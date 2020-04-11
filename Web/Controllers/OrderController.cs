using DSO.DotnetCore.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace my_new_app.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderRepository _orderRepository;

        public OrderController(ILogger<OrderController> logger, IOrderRepository orderRepository)
        {
            _logger = logger;
            _orderRepository = orderRepository;
        }

        public IActionResult GetAll()
        {
            try
            {
                _logger.LogInformation("GetAll");
                return Ok(_orderRepository.GetAll().ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
                return BadRequest();
            }
        }
    }
}