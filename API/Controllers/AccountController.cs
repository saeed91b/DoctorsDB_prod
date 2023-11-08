using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.Include(u => u.Favorites).FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (result) return CreateUserDTO(user);

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDTO.Username))
            {
                ModelState.AddModelError("username", "Username already taken!");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email", "Email already taken!");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDTO.Email,
                UserName = registerDTO.Username,
                DisplayName = registerDTO.DisplayName
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded) return CreateUserDTO(user);

            return BadRequest(result.Errors);
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(u => u.Favorites).FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));
            return CreateUserDTO(user);
        }

        [HttpGet("favorites")]
        public async Task<ActionResult<ICollection<Doctor>>> GetFavorites()
        {
            var user = await _userManager.Users.Include(u => u.Favorites).FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
            return user.Favorites.ToList();
        }

        private UserDTO CreateUserDTO(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                Favorites = user.Favorites
            };
        }
    }

}