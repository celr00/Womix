using API.Extensions;
using Core.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Helpers;

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

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == username);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _uow.Complete() < 0) return Ok();

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<Core.Helpers.PagedList<LikeDto>>> GetUserLikes([FromQuery] Core.Helpers.LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();

            var users = await _uow.LikesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, 
                users.PageSize, users.TotalCount, users.TotalPages));

            return Ok(users);
        }
    }
}