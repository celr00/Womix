using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class FollowRepository : IFollowRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FollowRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserJobInterest> Get(int userId, int jobId)
        {
            return await _context.UserJobInterests
                .FindAsync(jobId, userId);
        }

        public async Task<List<UserJobInterest>> ListAsync(int userId)
        {
            return await _context.UserJobInterests
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public void Remove(UserJobInterest entity)
        {
            _context.Remove(entity);
        }
    }
}