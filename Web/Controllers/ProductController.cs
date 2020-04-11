using AutoMapper;
using Domain.Core.Repositories;
using DSO.DotnetCore.Domain;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DSO.DotnetCore.Web.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;
        private readonly IProductRepository _repository;

        public ProductController(ILogger<ProductController> logger, DataContext dataContext, IMapper mapper, IProductRepository productRepository)
        {
            _dataContext = dataContext;
            _logger = logger;
            _mapper = mapper;
            _repository = productRepository;
        }

        [HttpPost("{id: int}")]
        public IActionResult Post([FromBody] ProductViewModel model)
        {
            try
            {

                _logger.LogInformation("Post");
                if (ModelState.IsValid)
                {
                    var newEntity = _mapper.Map<ProductViewModel, Product>(model);
                    _repository.Add(newEntity);
                    if (_repository.SaveChanges())
                    {
                        return Created($"/api/products/{newEntity.Id}", _mapper.Map<Product, ProductViewModel>(newEntity));
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

        [HttpPatch("{id}")]
        public string Patch(int id, object o)
        {
            return "Patch: " + id + ": " + DateTime.Now.ToLongTimeString();
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return "Delete: " + id + ": " + DateTime.Now.ToLongTimeString();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _repository.Get(id);
            if (result != null)
            {
                return Ok(_mapper.Map<Product, ProductViewModel>(result));
            }
            else
            {
                return NotFound();
            }

            //return "Get: " + DateTime.Now.ToLongTimeString();
        }

        [HttpGet]
        //[ProducesErrorResponseType()]
        //[ProducesErrorResponseType(400)]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            try
            {
                _logger.LogInformation("GetAll");
                var result = _repository.GetAll().OrderBy(p => p.Category).ToList();
                return Ok(_mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(result));
                //var result = _dataContext.Products.OrderBy(p => p.Category).ToList();                
                //return "GetAll: " + DateTime.Now.ToLongTimeString()  ;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
                return BadRequest(ex.Message);
            }
        }
    }
}