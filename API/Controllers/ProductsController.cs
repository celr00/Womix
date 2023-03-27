using API.Dtos;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<ItemClass> _itemClassesRepository;
        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ItemClass> itemClassesRepository, UserManager<AppUser> userManager, IUnitOfWork uow, IMapper mapper)
        {
            _itemClassesRepository = itemClassesRepository;
            _mapper = mapper;
            _uow = uow;
            _userManager = userManager;
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsSpecification(productParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageIndex, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound("This product might not exist");

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpPost]
        public async Task<ActionResult> Add(Product product)
        {
            var user = await _userManager.Users
                .Include(x => x.UserProducts)
                .Include(x => x.AppUserPhoto)
                .ThenInclude(x => x.Photo)
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            user.UserProducts.Add(new AppUserProduct
            {
                OwnerId = user.Id,
                Product = product
            });

            user.AppUserPhoto = new AppUserPhoto
            {
                UserId = user.Id,
                Photo = new Photo
                {
                    Url="",
                }
            };
            
            await _userManager.UpdateAsync(user);
                        
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(ProductUpdateDto request)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(request.Id));

            _mapper.Map<ProductUpdateDto, Product>(request, product);

            if (await _uow.Complete() < 0) return BadRequest("Failed to edit the product");

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _productsRepo.GetEntityWithSpec(new ProductsSpecification(id));

            if (product == null) return NotFound("Product not found");

            _productsRepo.Delete(product);

            await _uow.Complete();

            return Ok();
        }

        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ItemClass>>> GetItemClasses()
        {
            var itemClasses = await _itemClassesRepository.ListAllAsync();

            if (itemClasses == null) return BadRequest("An error occurred loading product types");

            return Ok(itemClasses);
        }

    }
}
