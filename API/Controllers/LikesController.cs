using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Errors;
using API.Dtos;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public LikesController(UserManager<AppUser> userManager, IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
            _userManager = userManager;
        }

        [HttpPost("save/{email}")]
        public async Task<ActionResult> Save(string email)
        {
            var sourceUserId = User.GetUserId();

            var likedUser = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Email == email);

            var sourceUser = await _userManager.Users
                .Include(x => x.LikedUsers)
                .SingleOrDefaultAsync(x => x.Id == sourceUserId);

            if (likedUser == null) return NotFound(new ApiResponse(404, "No se encontró el usuario de interés"));

            if (likedUser.Id == sourceUserId) return BadRequest(new ApiResponse(400, "No te puede interesar tu propio perfil"));

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al dar me gusta al usuario"));
            
            return Ok();
        }

        [HttpPost("unsave/{email}")]
        public async Task<ActionResult> Unsave(string email)
        {
            var sourceUserId = User.GetUserId();

            var likedUser = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Email == email);

            var sourceUser = await _userManager.Users
                .Include(x => x.LikedUsers)
                .SingleOrDefaultAsync(x => x.Id == sourceUserId);

            if (likedUser == null) return NotFound(new ApiResponse(404, "No se puedo enconrar el usuario de interés"));

            if (likedUser.Id == sourceUserId) return BadRequest(new ApiResponse(400, "No te puede interesar tu propio perfil"));

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            sourceUser.LikedUsers.Remove(userLike);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al eliminar usuario"));
            
            return Ok();
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<bool>> IsLiked(string email)
        {
            var sourceUserId = User.GetUserId();
            
            var likedUsers = await _uow.LikesRepository.GetLikedUsers(sourceUserId);

            if (!likedUsers.Any()) return Ok(false);

            foreach (var user in likedUsers)
            {
                if(user.TargetUser.Email == email)
                    return Ok(true);
            }
            
            return Ok(false);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<UserToReturnDto>>> GetLikedUsers() 
        {
            var sourceUserId = User.GetUserId();
            
            var likedUsers = await _uow.LikesRepository.GetLikedUsers(sourceUserId);

            var usersToReturn = new List<UserToReturnDto>();

            foreach(var user in likedUsers)
            {
                usersToReturn.Add(_mapper.Map<AppUser, UserToReturnDto>(user.TargetUser));
            }

            return Ok(usersToReturn);
        }
    }
}