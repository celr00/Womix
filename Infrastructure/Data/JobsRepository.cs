using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class JobsRepository : IJobsRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public JobsRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<JobDto> GetLastAsync(int userId)
        {
            var jobs = await _context.Jobs
                .Where(x => x.UserJob.UserId == userId)
                .OrderBy(x => x.Id)
                .Include(x => x.UserJob.User).AsSplitQuery()
                .LastOrDefaultAsync();

            return _mapper.Map<Job, JobDto>(jobs); 
        }
    }
}