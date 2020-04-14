using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Core.Security;
using DSO.DotnetCore.Domain;
using DSO.DotnetCore.Web.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<User> _signinManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public AccountController(ILogger<AccountController> logger, SignInManager<User> signinManager, UserManager<User> userManager, IConfiguration configuration, DataContext dataContext)
        {
            _logger = logger;
            _signinManager = signinManager;
            _userManager = userManager;
            _configuration = configuration;
            _dataContext = dataContext;
        }
        [HttpGet("users")]
        public IActionResult GetAll()
        {
            List<User> result = _dataContext.Users.ToList();
            return base.Ok(result);
        }
        [HttpGet("users/{userName}")]
        public async Task<IActionResult> Get(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user != null)
            {
                return Ok(user);
            }else
            {
                return NotFound();
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            var result = await _signinManager.CheckPasswordSignInAsync(user, loginModel.Password, false);
            if (result.Succeeded)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)

                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    _configuration["Tokens:Issuer"],
                    _configuration["Tokens:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: credentials
                    );
                var results = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                };
                return Created("", results);
            }
            return BadRequest();
        }
    }
}
