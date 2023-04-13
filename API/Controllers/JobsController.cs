using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Job> _jobsRepo;
        private readonly IGenericRepository<Area> _areasRepo;
        private readonly IUnitOfWork _uow;
        public JobsController(IGenericRepository<Job> jobsRepo, IGenericRepository<Area> areasRepo, IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _areasRepo = areasRepo;
            _jobsRepo = jobsRepo;
            _mapper = mapper;
        }

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

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDto>> GetJob(int id)
        {
            var spec = new JobsSpecification(id);

            var job = await _jobsRepo.GetEntityWithSpec(spec);

            if (job == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Job, JobDto>(job));
        }

        [HttpPost]
        public async Task<ActionResult> Add(Job request)
        {
            request.UserJob.UserId = User.GetUserId();
            
            _jobsRepo.Add(request);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to add the Job"));

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(JobUpdateDto request)
        {
            var Job = await _jobsRepo.GetEntityWithSpec(new JobsSpecification(request.Id));

            Job.JobArea = new JobArea
            {
                AreaId = request.JobArea.AreaId,
                JobId = Job.Id
            };

            _mapper.Map<JobUpdateDto, Job>(request, Job);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to edit the Job"));

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var job = await _jobsRepo.GetEntityWithSpec(new JobsSpecification(id));

            if (job == null) return NotFound(new ApiResponse(404, "The areas list was not found"));

            _jobsRepo.Delete(job);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to delete the job"));

            return Ok();
        }

        [HttpGet("areas")]
        public async Task<ActionResult<IEnumerable<AreaDto>>> GetAreas()
        {
            var areas = await _areasRepo.ListAllAsync();

            if (areas == null) return BadRequest(new ApiResponse(400, "An error occurred loading the areas"));

            return Ok(_mapper.Map<IReadOnlyList<AreaDto>>(areas));
        }
    }
}