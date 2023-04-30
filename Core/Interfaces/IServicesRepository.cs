using Core.Dtos;

namespace Core.Interfaces
{
    public interface IServicesRepository
    {
        Task<ServiceDto> GetLastAsync(int userId);
    }
}