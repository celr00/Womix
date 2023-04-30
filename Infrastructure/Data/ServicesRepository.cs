using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ServicesRepository : IServicesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ServicesRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceDto> GetLastAsync(int userId)
        {
            var service = await _context.Services
                .Where(x => x.UserService.UserId == userId)
                .OrderBy(x => x.Id)
                .Include(x => x.UserService.User).AsSplitQuery()
                .Include(x => x.ServiceCategory).AsSplitQuery()
                .LastOrDefaultAsync();

            return _mapper.Map<Service, ServiceDto>(service); 
        }
    }
}