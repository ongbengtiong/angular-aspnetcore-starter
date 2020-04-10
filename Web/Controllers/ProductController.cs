using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DSO.DotnetCore.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<ConfigController> _logger;

        public ProductController(ILogger<ConfigController> logger, DataContext dataContext)
        {
            _dataContext = dataContext;
            _logger = logger;
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
        public IActionResult GetAll()
        {
            var result = _dataContext.Products.OrderBy(p => p.Category).ToList();
            return Ok(result);
            //return "GetAll: " + DateTime.Now.ToLongTimeString()  ;
        }
    }
}
