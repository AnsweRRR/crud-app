using auth.Model.Entities;
using auth.Server.DataAccess;
using auth.Server.DTO.Request;
using auth.Server.DTO.Response;
using auth.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace auth.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AuthDbContext _context;

        public AuthController(UserManager<ApplicationUser> userManager, TokenService tokenService, RoleManager<IdentityRole> roleManager, AuthDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthRequest request)
        {
            ApplicationUser user = new ApplicationUser { UserName = request.Email, Email = request.Email };

            IdentityResult? result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, "User");

            IList<string>? roles = await _userManager.GetRolesAsync(user);

            string? token = _tokenService.CreateToken(user, roles);
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponse { Token = token, RefreshToken = user.RefreshToken });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthRequest request)
        {
            ApplicationUser? user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                return Unauthorized();
            }

            IList<string>? roles = await _userManager.GetRolesAsync(user);

            string? token = _tokenService.CreateToken(user, roles);
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponse { Token = token, RefreshToken = user.RefreshToken });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            JwtSecurityToken? principal = new JwtSecurityTokenHandler().ReadJwtToken(request.Token);

            string? userId = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
            ApplicationUser? user = await _userManager.FindByIdAsync(userId!);

            if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return Unauthorized();
            }

            IList<string>? roles = await _userManager.GetRolesAsync(user);

            string? newToken = _tokenService.CreateToken(user, roles);
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponse { Token = newToken, RefreshToken = user.RefreshToken });
        }
    }
}
