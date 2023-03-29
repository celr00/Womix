using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public UsersController(UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<UserToReturnDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());
            
            if (user == null) return NotFound(new ApiResponse(404));
            
            return Ok(_mapper.Map<AppUser, UserToReturnDto>(user));
        }

        [HttpGet("entity")]
        public async Task<ActionResult<AppUserEntityDto>> GetEntity()
        {
            var user = await _userManager.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());
            
            if (user == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<AppUser, AppUserEntityDto>(user));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserToReturnDto>> GetUserById(int id)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == id);

            if (user == null) return NotFound(new ApiResponse(404));
            
            return Ok(_mapper.Map<AppUser, UserToReturnDto>(user));
        }
    }

}