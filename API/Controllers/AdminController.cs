using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly IGenericRepository<Photo> _photosRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        public AdminController(IGenericRepository<Photo> photosRepository, IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
            _photosRepository = photosRepository;
        }

        [HttpGet("photos")]
        public async Task<ActionResult<IReadOnlyList<PhotoDto>>> GetPhotos([FromQuery] PhotoSpecParams specParams)
        {
            var spec = new PhotoSpecification(specParams);
            var countSpec = new PhotoWithFiltersForCountSpecification(specParams);

            var totalItems = await _photosRepository.CountAsync(countSpec);
            var photos = await _photosRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<PhotoDto>>(photos);

            return Ok(new Pagination<PhotoDto>(specParams.PageIndex, specParams.PageSize, totalItems, data));
        }

        [HttpPut("photos/{id}")]
        public async Task<ActionResult<PhotoDto>> UpdateVisibility(int id)
        {
            var photo = await _photosRepository.GetByIdAsync(id);

            if (photo == null) 
                return NotFound(new ApiResponse(404, "The photo with this ID does not exist"));

            photo.Visible = !photo.Visible;

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to update this photo's visibility"));
            
            var photoToReturn = _mapper.Map<Photo, PhotoDto>(photo);
            
            return Ok(photoToReturn);
        }
    }
}