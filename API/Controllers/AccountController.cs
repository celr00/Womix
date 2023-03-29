using API.Dtos;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AccountDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            return new AccountDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Incorrect password");

            return new AccountDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value) return BadRequest("Email address already in use");

            var user = _mapper.Map<RegisterDto, AppUser>(registerDto);

            user.UserName = registerDto.Email;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new AccountDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpPut]
        public async Task<ActionResult<AppUserEntityDto>> Update(AppUserEntityDto request)
        {
            var user = await _userManager.Users
                .Include(x => x.AppUserAddress)
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            _mapper.Map<AppUserEntityDto, AppUser>(request, user);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Could not update user");

            return Ok(_mapper.Map<AppUser, AppUserEntityDto>(user));
        }

        [HttpPut("password-reset")]
        public async Task<ActionResult> ResetPassword(PasswordResetDto password)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            var result = await _signInManager.CheckPasswordSignInAsync(user, password.CurrentPassword, false);

            if (!result.Succeeded) return Unauthorized("The current password is incorrect");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _userManager.ResetPasswordAsync(user, token, password.NewPassword);

            return Ok();
        }
    }
}