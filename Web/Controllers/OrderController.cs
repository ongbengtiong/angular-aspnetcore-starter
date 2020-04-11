using DSO.DotnetCore.Domain.Entities;
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

        [HttpGet]
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

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var result = _orderRepository.Get(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                _logger.LogInformation("NotFound");
                return NotFound();
            }

            //return "Get: " + DateTime.Now.ToLongTimeString();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Order model)
        {
            try
            {
                _logger.LogInformation("Post");
                _orderRepository.Add(model);
                if (_orderRepository.SaveChanges())
                {
                    return Created($"/api/orders/{model.Id}", model);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
                
            }
            return BadRequest("Failed");
        }
    }
}