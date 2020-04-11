﻿using AutoMapper;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Domain.Repositories;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace my_new_app.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;

        public OrderController(ILogger<OrderController> logger, IMapper mapper, IOrderRepository orderRepository)
        {
            _logger = logger;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                _logger.LogInformation("GetAll");
                var result = _orderRepository.GetAll().ToList();
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
            var result = _orderRepository.Get(id);
            if (result != null)
            {
                return Ok(_mapper.Map<Order, OrderViewModel>(result));
            }
            else
            {
                _logger.LogInformation("NotFound");
                return NotFound();
            }

            //return "Get: " + DateTime.Now.ToLongTimeString();
        }

        [HttpPost]
        public IActionResult Post([FromBody] OrderViewModel model)
        {
            try
            {
                _logger.LogInformation("Post");
                if (ModelState.IsValid)
                {
                    var newOrder = _mapper.Map<OrderViewModel, Order>(model);

                    _orderRepository.Add(newOrder);
                    if (_orderRepository.SaveChanges())
                    {
                        return Created($"/api/orders/{newOrder.Id}", _mapper.Map<Order, OrderViewModel>(newOrder));
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