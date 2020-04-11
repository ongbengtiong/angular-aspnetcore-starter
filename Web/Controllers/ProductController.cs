using Domain.Core.Repositories;
using DSO.DotnetCore.Domain;
using DSO.DotnetCore.Domain.Entities;
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
        private readonly IProductRepository _repository;

        public ProductController(ILogger<ProductController> logger, DataContext dataContext, IProductRepository productRepository)
        {
            _dataContext = dataContext;
            _logger = logger;
            _repository = productRepository;
        }

        [HttpPost("{id}")]
        public string Post(int id, object o)
        {
            return "Post: " + id + ": " + DateTime.Now.ToLongTimeString();
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
            var result = _dataContext.Products.Find(id);
            if (result != null)
            {
                return Ok(result);
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
                //var result = _dataContext.Products.OrderBy(p => p.Category).ToList();
                return Ok(result);
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