using AutoMapper;
using Domain.Core.Repositories;
using DSO.DotnetCore.Domain;
using DSO.DotnetCore.Domain.Entities;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using X.PagedList;

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
        private int maxPageSize = 10;

        public ProductController(ILogger<ProductController> logger, DataContext dataContext, IMapper mapper, IProductRepository productRepository)
        {
            _dataContext = dataContext;
            _logger = logger;
            _mapper = mapper;
            _repository = productRepository;
        }

        [HttpPost()]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        [HttpPut("{id:int}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Put(int id, [FromBody] ProductViewModel model)
        {
            try
            {

                _logger.LogInformation("Put");
                if (ModelState.IsValid)
                {
                    // https://entityframework.net/knowledge-base/50532569/automapper--to-do-an-update-on-existing-entity-object
                    var existingEntity = _repository.Get(id);
                    var inputEntity = _mapper.Map<ProductViewModel, Product>(model);

                    _mapper.Map<ProductViewModel, Product>(model, existingEntity);


                    if (_repository.SaveChanges())
                    {
                        return Ok(_mapper.Map<Product, ProductViewModel>(existingEntity));
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
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = _repository.Delete(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
            }

            return BadRequest("Failed");
            //return "Delete: " + id + ": " + DateTime.Now.ToLongTimeString();

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
        [HttpPost]
        [Route("categories/get")]
        //[ProducesErrorResponseType()]
        //[ProducesErrorResponseType(400)]
        public ActionResult GetAllCategories( string filter)  //, string sort = "id", int page = 1, int pageSize = 3)
        {
            var categories =new string[] { "asdsdfdsf", "sdfsdfsdfsdf", "qwehf456", "xbftjr", "rtertert" };
            var x = new object[5];

            x[0] = new { id = "1", displayName = "sdasdasda" };
            x[1] = new { id = "2", displayName = "fgdfgnvnbvbt" };
            x[2] = new { id = "3", displayName = "gjkghjghfgh" };
            x[3] = new { id = "4", displayName = "gkfgjfghgfh" };
            x[4] = new { id = "5", displayName = "fgdghfghfgh" };

            try
            {
                var result = categories.Where(o => o.Contains(filter)).Select(o => new { id = 1, displayName = o });
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error", ex);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("", Name = "GetProducts")]
        //[ProducesErrorResponseType()]
        //[ProducesErrorResponseType(400)]
        public ActionResult<IEnumerable<Product>> GetAll(string sort = "id", int page = 1, int pageSize = 3)
        {
            try
            {
                _logger.LogInformation("GetAll");
                var result = _repository.GetAll(sort);
                if (pageSize > maxPageSize)
                {
                    pageSize = maxPageSize;
                }
                var pagedResult = result.ToPagedList(page, pageSize);

                var urlHelper = this.Url;

                var previousPageLink = page > 1 ? urlHelper.Link("GetProducts", new
                {
                    page = page - 1,
                    pageSize = pageSize,
                    sort = sort,
                }) : "";


                var nextPageLink = page < pagedResult.PageCount ? urlHelper.Link("GetProducts", new
                {
                    page = page + 1,
                    pageSize = pageSize,
                    sort = sort,

                }) : "";
                var paginationHeader = new
                {
                    currentPage = page,
                    pageSize = pageSize,
                    totalCount = pagedResult.TotalItemCount,
                    totalPages = pagedResult.PageCount,
                    previousPageLink = previousPageLink,
                    nextPageLink = nextPageLink
                };

                HttpContext.Response.Headers.Add("X-Pagination", Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));


                return Ok(_mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(pagedResult.ToList()));
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