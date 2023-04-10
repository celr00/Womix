using Core.Dtos;
using Core.Entities;
using Core.Helpers;

namespace Core.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
        Task<List<UserLike>> GetLikedUsers(int sourceUserId);
    }
}