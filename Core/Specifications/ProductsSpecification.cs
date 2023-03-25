using Core.Entities;

namespace Core.Specifications
{
    public class ProductsSpecification : BaseSpecification<Product>
    {
        public ProductsSpecification(ProductSpecParams productParams)
            : base(x =>
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.ItemClassId.HasValue || x.ProductItemClass.ItemClassId == productParams.ItemClassId)
            )
        {
            AddInclude(x => x.ProductPhotos);
            AddInclude(x => x.ProductItemClass);
            AddInclude(x => x.AppUserProduct);
            AddInclude(x => x.AppUserProduct.Owner);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1),
                productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductPhotos);
            AddInclude(x => x.ProductItemClass);
            AddInclude(x => x.AppUserProduct);
            AddInclude(x => x.AppUserProduct.Owner);
        }
    }
}