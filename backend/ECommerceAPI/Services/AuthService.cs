using ECommerceAPI.Models;
using ECommerceAPI.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerceAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    }

    public class AuthService : IAuthService
    {
        private static List<User> _users = new List<User>
        {
            new User { Id = 1, Email = "admin@test.com", Password = "password123", FirstName = "Admin", LastName = "User" }
        };

        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = _users.FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);
            if (user == null)
                throw new UnauthorizedAccessException("Invalid credentials");

            var token = GenerateJwtToken(user);
            
            return await Task.FromResult(new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            });
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            if (_users.Any(u => u.Email == registerDto.Email))
                throw new ArgumentException("Email already exists");

            var user = new User
            {
                Id = _users.Max(u => u.Id) + 1,
                Email = registerDto.Email,
                Password = registerDto.Password,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };

            _users.Add(user);

            var token = GenerateJwtToken(user);

            return await Task.FromResult(new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            });
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-here-make-it-long-enough"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: "ECommerceAPI",
                audience: "ECommerceAPI",
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}