using Core.Dtos;

namespace Core.Interfaces
{
    public interface IJobsRepository
    {
        Task<JobDto> GetLastAsync(int userId);
    }
}