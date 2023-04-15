using Core.Entities;

namespace Core.Interfaces
{
    public interface IFollowRepository
    {
        Task<UserJobInterest> Get(int userId, int jobId);
        Task<List<UserJobInterest>> ListAsync(int userId);
        void Remove(UserJobInterest entity);
    }
}