using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ProductDto> GetLastAsync(int userId)
        {
            var product = await _context.Products
                .Where(x => x.UserProduct.UserId == userId)
                .OrderBy(x => x.Id)
                .Include(x => x.UserProduct.User).AsSplitQuery()
                .Include(x => x.ProductItemClass).AsSplitQuery()
                .LastOrDefaultAsync();

            return _mapper.Map<Product, ProductDto>(product); 
        }
    }
}