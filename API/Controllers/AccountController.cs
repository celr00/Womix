using API.Dtos;
using API.Errors;
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
        private readonly IGenericRepository<Address> _addressRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<Service> _serviceRepo;
        private readonly IGenericRepository<Photo> _photoRepo;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper, IGenericRepository<Address> addressRepo, IGenericRepository<Product> productRepo, IGenericRepository<Service> serviceRepo, IGenericRepository<Photo> photoRepo)
        {
            _photoRepo = photoRepo;
            _serviceRepo = serviceRepo;
            _productRepo = productRepo;
            _addressRepo = addressRepo;
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
                Role = user.UserRole.Role.Name,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Incorrect password");

            return new AccountDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = user.UserRole.Role.Name,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse 
                    { Errors = new[] { "Email address is in use" } });
            }

            var user = _mapper.Map<RegisterDto, AppUser>(registerDto);

            user.UserName = registerDto.Email;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Failed to create the user"));

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(new ApiResponse(400, "Failed to add the user to the role"));

            return new AccountDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = user.UserRole.Role.Name,
                FirstName = user.FirstName,
                LastName = user.LastName
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

            if (request.AppUserPhoto == null)
            {
                request.AppUserPhoto = new AppUserPhotoDto
                {
                    UserId = user.Id,
                    Photo = request.AppUserPhoto.Photo,
                };
            }

            if (request.AppUserAddress == null)
            {
                request.AppUserAddress = new AppUserAddressDto
                {
                    UserId = user.Id,
                    Address = request.AppUserAddress.Address
                };
            }

            _mapper.Map<AppUserEntityDto, AppUser>(request, user);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Failed to update the user"));

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

        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            var userProducts = user.UserProducts;
            var userServices = user.UserServices;

            if (user.AppUserAddress != null)
                _addressRepo.Delete(user.AppUserAddress.Address);

            if (user.AppUserPhoto != null)
                _photoRepo.Delete(user.AppUserPhoto.Photo);

            foreach (var product in userProducts)
                _productRepo.Delete(product.Product);

            foreach (var service in userServices)
                _serviceRepo.Delete(service.Service);

            foreach(var userProduct in userProducts)
            {
                foreach (var photo in userProduct.Product.ProductPhotos)
                {
                    _photoRepo.Delete(photo.Photo);
                }
            }

            foreach(var userService in userServices)
            {
                foreach (var photo in userService.Service.ServicePhotos)
                {
                    _photoRepo.Delete(photo.Photo);
                }
            }

            if (user == null) return NotFound(new ApiResponse(404));
            
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Failed to delete the user"));
            
            return Ok();
        }

        [HttpDelete("photo")]
        public async Task<ActionResult> RemovePhoto() 
        {
            
            
            return Ok();
        }
    }
}