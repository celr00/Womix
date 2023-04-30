using Core.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;

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

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductSpecParams specParams)
        {
            var spec = new ProductsSpecification(specParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(specParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ProductDto>>(products);

            return Ok(new Pagination<ProductDto>(specParams.PageIndex, specParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var spec = new ProductsSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Product, ProductDto>(product));
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> Add(Product request)
        {
            var userId = User.GetUserId();

            request.UserProduct.UserId = User.GetUserId();
            
            _productsRepo.Add(request);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al añadir producto"));

            var productToReturn = await _uow.ProductsRepository.GetLastAsync(userId);

            return Ok(productToReturn);
        }

        [HttpPut]
        public async Task<ActionResult<ProductDto>> Update(ProductUpdateDto request)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(request.Id));

            product.ProductItemClass = new ProductItemClass
            {
                ItemClassId = request.ProductItemClass.ItemClassId
            };

            _mapper.Map<ProductUpdateDto, Product>(request, product);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al editar producto"));

            return Ok(_mapper.Map<Product, ProductDto>(product));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(id));

            if (product == null) return NotFound(new ApiResponse(404));

            foreach (var productPhoto in product.ProductPhotos)
            {
                _photoRepo.Delete(productPhoto.Photo);

                if (!string.IsNullOrEmpty(productPhoto.Photo.PublicId))
                {
                    var result = await _photoService.DeletePhoto(productPhoto.Photo.PublicId);

                    if (result.Error != null) return BadRequest(new ApiResponse(400, result.Error.Message));
                }
            }

            _productsRepo.Delete(product);

            await _uow.Complete();

            return Ok();
        }

        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ItemClass>>> GetItemClasses()
        {
            var itemClasses = await _itemClassesRepository.ListAllAsync();

            if (itemClasses == null) return BadRequest(new ApiResponse(400, "Ocurrió un error al cargar los tipos de productos"));

            return Ok(_mapper.Map<IReadOnlyList<ItemClassDto>>(itemClasses));
        }

        [HttpPost("photo/{id}")]
        public async Task<ActionResult<ProductDto>> AddPhoto(IFormFile file, int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(id));

            if (product == null) return NotFound(new ApiResponse(404));

            var result = await _photoService.AddPhoto(file);

            if (result.Error != null) return BadRequest(new ApiResponse(400, result.Error.Message));

            product.ProductPhotos.Add(new ProductPhoto
            {
                Photo = new Photo
                {
                    Url = result.SecureUrl.AbsoluteUri,
                    PublicId = result.PublicId
                }
            });

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al añadir la imagen del producto"));

            return Ok(_mapper.Map<Product, ProductDto>(product));
        }

        [HttpDelete("photo/delete")]
        public async Task<ActionResult<ProductDto>> DeletePhoto(int productId, int photoId)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(productId));

            if (product == null) return NotFound(new ApiResponse(404));

            var photo = product.ProductPhotos.Find(x => x.PhotoId == photoId);

            if (!string.IsNullOrEmpty(photo.Photo.PublicId))
            {
                var deletePhotoResult = await _photoService.DeletePhoto(photo.Photo.PublicId);

                if (deletePhotoResult.Error != null) return BadRequest(new ApiResponse(400, deletePhotoResult.Error.Message));
            }

            product.ProductPhotos.Remove(photo);

            if (await _uow.Complete() < 0) return BadRequest(new ApiResponse(400, "Error al eliminar la foto"));

            return Ok(_mapper.Map<Product, ProductDto>(product));
        }
    }
}
