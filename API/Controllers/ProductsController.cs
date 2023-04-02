using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<ItemClass> _itemClassesRepository;
        private readonly IPhotoService _photoService;
        private readonly IGenericRepository<Photo> _photoRepo;
        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ItemClass> itemClassesRepository, UserManager<AppUser> userManager, IUnitOfWork uow, IMapper mapper, IPhotoService photoService, IGenericRepository<Photo> photoRepo)
        {
            _photoRepo = photoRepo;
            _photoService = photoService;
            _itemClassesRepository = itemClassesRepository;
            _mapper = mapper;
            _uow = uow;
            _userManager = userManager;
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductSpecParams specParams)
        {
            var spec = new ProductsSpecification(specParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(specParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ProductDto>>(products);

            return Ok(new Pagination<ProductDto>(specParams.PageIndex, specParams.PageIndex, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var spec = new ProductsSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Product, ProductDto>(product));
        }

        [HttpPost]
        public async Task<ActionResult> Add(Product request)
        {
            _productsRepo.Add(request);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to add the product"));

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(ProductUpdateDto request)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(request.Id));

            product.ProductItemClass = new ProductItemClass
            {
                ItemClassId = request.ProductItemClass.ItemClassId
            };

            _mapper.Map<ProductUpdateDto, Product>(request, product);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to edit the product"));

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(id));

            if (product == null) return NotFound(new ApiResponse(404));

            _productsRepo.Delete(product);

            await _uow.Complete();

            return Ok();
        }

        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ItemClass>>> GetItemClasses()
        {
            var itemClasses = await _itemClassesRepository.ListAllAsync();

            if (itemClasses == null) return BadRequest(new ApiResponse(400, "An error occurred loading product types"));

            return Ok(_mapper.Map<IReadOnlyList<ItemClassDto>>(itemClasses));
        }

        [HttpPost("photo/{id}")]
        public async Task<ActionResult<ProductDto>> AddPhoto(IFormFile file, int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(id));

            if (product == null) return NotFound(new ApiResponse(404));

            var result = await _photoService.AddPhoto(file);

            if (result.Error != null) return BadRequest(new ApiResponse(400, result.Error.Message));
            
            product.ProductPhotos.Add(new ProductPhoto {
                Photo = new Photo {
                    Url = result.SecureUrl.AbsoluteUri
                }
            });

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to add the photo to the product"));
            
            return Ok(_mapper.Map<Product, ProductDto>(product));
        }

        [HttpDelete("photo/delete")]
        public async Task<ActionResult<ProductDto>> DeletePhoto(int productId, int photoId)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(productId));

            if (product == null) return NotFound(new ApiResponse(404));

            product.ProductPhotos.Remove(product.ProductPhotos.Find(x => x.PhotoId == photoId));

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Failed to delete the photo"));
            
            return Ok(_mapper.Map<Product, ProductDto>(product));
        }
    }
}
