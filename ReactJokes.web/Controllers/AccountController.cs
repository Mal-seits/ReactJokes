using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactJokes.data;
using ReactJokes.web.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ReactJokes.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;
        private IConfiguration _configuration;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }
        [HttpPost]
        [Route("Signup")]
        public void Signup(SignupViewModel signupViewModel)
        {
            var repo = new AccountRepository(_connectionString);
            repo.Signup(signupViewModel, signupViewModel.Password);
        }
        [HttpGet]
        [Route("GetCurrentUser")]
        public User GetCurrentUser()
        {
            string userId = User.FindFirst("user")?.Value;
            if (String.IsNullOrEmpty(userId))
            {
                return null;
            }
            var repo = new AccountRepository(_connectionString);
            return repo.GetUserByEmail(userId);
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginViewModel loginViewModel)
        {
            var repo = new AccountRepository(_connectionString);
            var user = repo.Login(loginViewModel.Email, loginViewModel.Password);
            if(user == null)
            {
                return Unauthorized();
            }
            var claims = new List<Claim>
            {
                new Claim("user", loginViewModel.Email)
            };

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWTSecret")));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(signingCredentials: credentials,
                claims: claims);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { token = tokenString });
        }
    }
}
