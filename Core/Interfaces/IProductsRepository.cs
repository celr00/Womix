using Core.Dtos;

namespace Core.Interfaces
{
    public interface IProductsRepository
    {
        Task<ProductDto> GetLastAsync(int userId);
    }
}