using System.Net;
using System.Net.Mail;
using System.Text;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
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
        private readonly IPhotoService _photoService;
        private readonly IPdfService _pdfService;
        private readonly IGenericRepository<Job> _jobsRepo;
        private readonly string _resetUrl;
        private readonly IConfiguration _configuration;
        public AccountController
        (
            UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper, IGenericRepository<Address> addressRepo,
            IGenericRepository<Product> productRepo, IGenericRepository<Service> serviceRepo,
            IGenericRepository<Photo> photoRepo, IPhotoService photoService, IGenericRepository<Job> jobsRepo,
            IConfiguration configuration, IPdfService pdfService, IWebHostEnvironment env
        )
        {
            _jobsRepo = jobsRepo;
            _photoService = photoService;
            _pdfService = pdfService;
            _photoRepo = photoRepo;
            _serviceRepo = serviceRepo;
            _productRepo = productRepo;
            _addressRepo = addressRepo;
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
            _configuration = configuration;
            _resetUrl = "https://womix-beta.online/password_reset/{0}";
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AccountDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            return new AccountDto
            {
                Id = user.Id,
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

            if (user == null) return Unauthorized("email invalido");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("contraseña incorrecta");

            return new AccountDto
            {
                Id = user.Id,
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
                { Errors = new[] { "Esta dirección de correo ya está en uso" } });
            }

            var user = _mapper.Map<RegisterDto, AppUser>(registerDto);

            user.UserName = registerDto.Email;

            var result = await _userManager.CreateAsync(user, registerDto.ConfirmPassword);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al crear usuario"));

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(new ApiResponse(400, "Failed to add the user to the role"));

            return new AccountDto
            {
                Id = user.Id,
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
            var userId = User.GetUserId();

            var user = await _userManager.Users
                .Include(x => x.AppUserAddress)
                .SingleOrDefaultAsync(x => x.Id == userId);

            if (request.AppUserPhoto.PhotoId == 0)
            {
                request.AppUserPhoto = new AppUserPhotoDto
                {
                    UserId = user.Id,
                    Photo = request.AppUserPhoto.Photo,
                };
            }

            if (request.AppUserAddress.AddressId == 0)
            {
                request.AppUserAddress = new AppUserAddressDto
                {
                    UserId = user.Id,
                    Address = request.AppUserAddress.Address
                };
            }

            _mapper.Map<AppUserEntityDto, AppUser>(request, user);

            user.Id = userId;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            return Ok(_mapper.Map<AppUser, AppUserEntityDto>(user));
        }

        [HttpPut("password-reset")]
        public async Task<ActionResult> ResetPassword(PasswordResetDto password)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            var result = await _signInManager.CheckPasswordSignInAsync(user, password.CurrentPassword, false);

            if (!result.Succeeded) return Unauthorized("La contraseña es incorrecta");

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
            var userJobs = user.UserJobs;

            if (user.AppUserAddress != null)
                _addressRepo.Delete(user.AppUserAddress.Address);

            if (user.AppUserPhoto != null)
                _photoRepo.Delete(user.AppUserPhoto.Photo);

            foreach (var product in userProducts)
                _productRepo.Delete(product.Product);

            foreach (var service in userServices)
                _serviceRepo.Delete(service.Service);

            foreach (var job in userJobs)
                _jobsRepo.Delete(job.Job);

            foreach (var userProduct in userProducts)
            {
                foreach (var photo in userProduct.Product.ProductPhotos)
                {
                    _photoRepo.Delete(photo.Photo);

                    if (!string.IsNullOrEmpty(photo.Photo.PublicId))
                    {
                        var photoDeleteResult = await _photoService.DeletePhoto(photo.Photo.PublicId);

                        if (photoDeleteResult.Error != null) return BadRequest(new ApiResponse(400, photoDeleteResult.Error.Message));
                    }
                }
            }

            foreach (var userService in userServices)
            {
                foreach (var photo in userService.Service.ServicePhotos)
                {
                    _photoRepo.Delete(photo.Photo);

                    if (!string.IsNullOrEmpty(photo.Photo.PublicId))
                    {
                        var photoDeleteResult = await _photoService.DeletePhoto(photo.Photo.PublicId);

                        if (photoDeleteResult.Error != null) return BadRequest(new ApiResponse(400, photoDeleteResult.Error.Message));
                    }
                }
            }

            if (user == null) return NotFound(new ApiResponse(404));

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al eliminar el usuario"));

            return Ok();
        }

        [HttpPost("photo/{userId}")]
        public async Task<ActionResult<AppUserEntityDto>> SetPhoto(IFormFile file, int userId)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == userId);

            var photoAddResult = await _photoService.AddAccountPhoto(file);

            if (photoAddResult.Error != null) return BadRequest(new ApiResponse(400, photoAddResult.Error.Message));

            if (user.AppUserPhoto == null)
            {
                user.AppUserPhoto = new AppUserPhoto
                {
                    Photo = new Photo
                    {
                        Url = photoAddResult.SecureUrl.AbsoluteUri,
                        PublicId = photoAddResult.PublicId
                    }
                };
            }
            else
            {
                user.AppUserPhoto.Photo.Url = photoAddResult.SecureUrl.AbsoluteUri;
                user.AppUserPhoto.Photo.PublicId = photoAddResult.PublicId;
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            return Ok(_mapper.Map<AppUser, AppUserEntityDto>(user));
        }

        [HttpDelete("photo/{userId}")]
        public async Task<ActionResult> RemovePhoto(int userId)
        {
            var user = await _userManager.Users
                .Include(x => x.AppUserPhoto)
                .ThenInclude(x => x.Photo)
                .SingleOrDefaultAsync(x => x.Id == userId);

            if (!string.IsNullOrEmpty(user.AppUserPhoto.Photo.PublicId))
            {
                var deletePhotoResult = await _photoService.DeletePhoto(user.AppUserPhoto.Photo.PublicId);

                if (deletePhotoResult.Error != null) return BadRequest(new ApiResponse(400, deletePhotoResult.Error.Message));
            }

            user.AppUserPhoto.Photo.Url = "";
            user.AppUserPhoto.Photo.PublicId = "";

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("password-reset/{email}")]
        public async Task<IActionResult> PasswordReset(string email)
        {
            // Look up the user with the given email address
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Return a 404 Not Found error if the user was not found
                return NotFound();
            }

            // Generate a password reset token that expires in 3 hours
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var resetUrl = string.Format(_resetUrl, resetToken);

            // Compose the email message with a green button that links to the password reset form
            var subject = "Reset your Womix password";
            var htmlMessage = $@"<html><body>
                                <p>You requested to reset your password.</p>
                                <p>Click the button below to reset your password:</p>
                                <a href='{resetUrl}' style='background-color:green;color:white;padding:10px 20px;text-decoration:none;font-weight:bold;'>Reset Password</a>
                                </body></html>";
            var message = new MailMessage
            {
                From = new MailAddress("sender@example.com"),
                To = { email },
                Subject = subject,
                Body = htmlMessage,
                IsBodyHtml = true
            };

            // Send the email using the SMTP server configuration from the app settings
            using var client = new SmtpClient
            {
                Host = _configuration.GetValue<string>("Smtp:Host"),
                Port = _configuration.GetValue<int>("Smtp:Port"),
                Credentials = new NetworkCredential(_configuration.GetValue<string>("Smtp:Username"), _configuration.GetValue<string>("Smtp:Password")),
                EnableSsl = _configuration.GetValue<bool>("Smtp:UseSsl")
            };
            await client.SendMailAsync(message);

            // Return a 200 OK status with an empty response body
            return Ok();
        }
        [HttpPost("password-reset-token")]
        public async Task<ActionResult> ResetPasswordWithToken(PasswordResetWithTokenDto resetDto)
        {
            var decodedToken = WebEncoders.Base64UrlDecode(resetDto.Token);
            var user = await _userManager.FindByPasswordResetTokenAsync(Encoding.UTF8.GetString(decodedToken));
            if (user == null)
            {
                return BadRequest(new ApiResponse(400, "Invalid token"));
            }

            var result = await _userManager.ResetPasswordAsync(user, Encoding.UTF8.GetString(decodedToken), resetDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400, "Failed to reset password"));
            }

            return Ok();
        }

        [HttpPost("pdf/{userId}")]
        public async Task<IActionResult> UploadPdf(IFormFile file, int userId)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == userId);

            var pdfAddResult = await _pdfService.AddPdf(file);

            if (pdfAddResult.Error != null) return BadRequest(new ApiResponse(400, pdfAddResult.Error.Message));

            if (user.AppUserCurriculum == null)
            {
                user.AppUserCurriculum = new AppUserCurriculum
                {
                    Curriculum = new Curriculum
                    {
                        Url = pdfAddResult.SecureUrl.AbsoluteUri,
                        PublicId = pdfAddResult.PublicId
                    }
                };
            }
            else
            {
                user.AppUserCurriculum.Curriculum.Url = pdfAddResult.SecureUrl.AbsoluteUri;
                user.AppUserCurriculum.Curriculum.PublicId = pdfAddResult.PublicId;
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            return Ok(_mapper.Map<AppUser, AppUserEntityDto>(user));
        }

        [HttpDelete("pdf/{userId}")]
        public async Task<IActionResult> DeletePdf(int userId)
        {
            var user = await _userManager.Users
                .Include(x => x.AppUserCurriculum)
                .ThenInclude(x => x.Curriculum)
                .SingleOrDefaultAsync(x => x.Id == userId);

            if (!string.IsNullOrEmpty(user.AppUserCurriculum.Curriculum.PublicId))
            {
                var deleteCurriculumResult = await _pdfService.DeletePdf(user.AppUserCurriculum.Curriculum.PublicId);

                if (deleteCurriculumResult.Error != null) return BadRequest(new ApiResponse(400, deleteCurriculumResult.Error.Message));
            }

            user.AppUserCurriculum.Curriculum.Url = "";
            user.AppUserCurriculum.Curriculum.PublicId = "";

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            return Ok();
        }

        [HttpPut("address")]
        public async Task<ActionResult<AppUserEntityDto>> ToggleAddress()
        {
            var userId = User.GetUserId();
            
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null) return NotFound(new ApiResponse(404, "User was not found"));

            user.ShowAddress = !user.ShowAddress;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Fallo al actualizar el usuario"));

            var userToReturn = _mapper.Map<AppUser, AppUserEntityDto>(user);

            return Ok(userToReturn);
        }
    }
}
