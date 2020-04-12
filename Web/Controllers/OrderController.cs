using AutoMapper;
using Domain.Core.Security;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Domain.Repositories;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DSO.DotnetCore.Web.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        private readonly UserManager<User> _userManager;

        public OrderController(ILogger<OrderController> logger, IMapper mapper, IOrderRepository orderRepository, UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userManager = userManager;
        }

        
        [HttpGet]
        public IActionResult GetAll(bool includeItems = true)
        {
            try
            {
                var userName = User.Identity.Name;
                _logger.LogInformation("GetAll");
                var result = _orderRepository.GetAllByUser(userName, includeItems);
                return Ok(_mapper.Map<IEnumerable<Order>, IEnumerable<OrderViewModel>>(result));
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
            try
            {
                var userName = User.Identity.Name;
                var result = _orderRepository.GetByUser(userName, id);
                if (result != null)
                {
                    return Ok(_mapper.Map<Order, OrderViewModel>(result));
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

            //return "Get: " + DateTime.Now.ToLongTimeString();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderViewModel model)
        {
            try
            {
                _logger.LogInformation("Post");
                if (ModelState.IsValid)
                {
                    var newEntity = _mapper.Map<OrderViewModel, Order>(model);
                    var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                    newEntity.User = currentUser;
                    _orderRepository.Add(newEntity);
                    if (_orderRepository.SaveChanges())
                    {
                        return Created($"/api/orders/{newEntity.Id}", _mapper.Map<Order, OrderViewModel>(newEntity));
                    }
                }
                else
                {
                    return BadRequest("Failed");
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