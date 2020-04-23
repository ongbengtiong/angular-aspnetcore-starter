using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.Extensions.Logging;

namespace DSO.DotnetCore.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpressionController : ControllerBase
    {
       
        private readonly ILogger<ConfigController> _logger;

        public ExpressionController(ILogger<ConfigController> logger)
        {
            _logger = logger;
        }

        [HttpGet("NReco")]        
        public IActionResult GetNReco(string expression)
        {
            var lambdaParser = new NReco.Linq.LambdaParser();
            var varContext = new Dictionary<string, object>();

            try
            {
                var result = lambdaParser.Eval(expression, varContext);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("expression: " + expression, ex);
                return StatusCode(StatusCodes.Status500InternalServerError);

            }

        }
        [HttpGet("CSharpScript")]
        public IActionResult GetCSharpScript(string expression)
        {
        
            try
            {
                var result = CSharpScriptParseAsync(expression);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("expression: " + expression, ex);
                return StatusCode(StatusCodes.Status500InternalServerError);

            }

        }
        private async Task<object> CSharpScriptParseAsync(string expression)
        {
            var globals = new Globals { };
            return await CSharpScript.EvaluateAsync(expression, globals: globals);

        }
        public class Globals
        {
            public int X;
            public int Y;
        }
    }
}
