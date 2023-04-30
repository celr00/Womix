using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Job> _jobsRepo;
        private readonly IGenericRepository<Area> _areasRepo;
        private readonly IUnitOfWork _uow;
        private readonly UserManager<AppUser> _userManager;
        public JobsController(IGenericRepository<Job> jobsRepo, IGenericRepository<Area> areasRepo, IMapper mapper, IUnitOfWork uow, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _uow = uow;
            _areasRepo = areasRepo;
            _jobsRepo = jobsRepo;
            _mapper = mapper;
        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<JobDto>>> GetJobs([FromQuery] JobSpecParams specParams)
        {
            var spec = new JobsSpecification(specParams);
            var countSpec = new JobsWithFiltersForCountSpecification(specParams);

            var totalItems = await _jobsRepo.CountAsync(countSpec);
            var jobs = await _jobsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<JobDto>>(jobs);

            return Ok(new Pagination<JobDto>(specParams.PageIndex, specParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        public async Task<ActionResult<JobDto>> GetJob(int id)
        {
            var spec = new JobsWithUserJobInterestSpecification(id);

            var job = await _jobsRepo.GetEntityWithSpec(spec);

            if (job == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Job, JobDto>(job));
        }

        [HttpPost]
        public async Task<ActionResult<JobDto>> Add(Job request)
        {
            var userId = User.GetUserId();
            
            request.UserJob.UserId = userId;
            
            _jobsRepo.Add(request);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Fallo al añadir el trabajo"));

            var jobToReturn = await _uow.JobsRepository.GetLastAsync(userId);

            return Ok(jobToReturn);
        }

        [HttpPut]
        public async Task<ActionResult<JobDto>> Update(JobUpdateDto request)
        {
            var job = await _jobsRepo.GetEntityWithSpec(new JobsSpecification(request.Id));

            job.JobArea = new JobArea
            {
                AreaId = request.JobArea.AreaId,
                JobId = job.Id
            };

            _mapper.Map<JobUpdateDto, Job>(request, job);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Fallo al editar el trabajo"));

            return Ok(_mapper.Map<Job, JobDto>(job));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var job = await _jobsRepo.GetEntityWithSpec(new JobsSpecification(id));

            if (job == null) return NotFound(new ApiResponse(404, "No se encontró la lista de áreas"));

            _jobsRepo.Delete(job);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Fallo al eliminar el trabajo"));

            return Ok();
        }

        [Cached(600)]
        [HttpGet("areas")]
        public async Task<ActionResult<IEnumerable<AreaDto>>> GetAreas()
        {
            var areas = await _areasRepo.ListAllAsync();

            if (areas == null) return BadRequest(new ApiResponse(400, "Ocurrió un error al cargar las áreas"));

            return Ok(_mapper.Map<IReadOnlyList<AreaDto>>(areas));
        }

        [Cached(600)]
        [HttpGet("follow")]
        public async Task<ActionResult<IReadOnlyList<UserJobInterestDto>>> GetInterestedJobsList()
        {
            var userId = User.GetUserId();
            
            var user = await _userManager.Users
                .Include(x => x.FollowingJobs)
                .ThenInclude(x => x.Job)
                .ThenInclude(x => x.UserJob)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == userId);
            
            return Ok(_mapper.Map<IReadOnlyList<UserJobInterestDto>>(user.FollowingJobs));
        }

        [HttpPost("follow/{jobId}")]
        public async Task<ActionResult> Follow(int jobId)
        {
            var userId = User.GetUserId();

            var user = await _userManager.Users
                .Include(x => x.FollowingJobs)
                .SingleOrDefaultAsync(x => x.Id == userId);

            var userJobInterest = await _uow.FollowRepository
                .Get(userId, jobId);

            if (userJobInterest != null) 
                return BadRequest(new ApiResponse(400, "Ya sigues este trabajo"));

            userJobInterest = new UserJobInterest
            {
                JobId = jobId,
                UserId = userId
            };

            user.FollowingJobs.Add(userJobInterest);

            if (await _uow.Complete() < 0) 
                return BadRequest(new ApiResponse(400, "Fallo al agregar este trabajo a tus intereses"));

            return Ok();
        }

        [HttpPost("unfollow/{jobId}")]
        public async Task<ActionResult> Unfollow(int jobId)
        {
            var userId = User.GetUserId();

            var data = await _uow.FollowRepository.Get(userId, jobId);

            if (data == null) 
                return NotFound(new ApiResponse(404, "No se encontró"));

            _uow.FollowRepository.Remove(data);

            if (await _uow.Complete() < 0) 
                return BadRequest(new ApiResponse(400, "Error al eliminar el trabajo"));

            return Ok();
        }
    }
}