using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams specParams) : base
        (x =>
            (
                string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search)

            ) &&
            (
                !specParams.UserId.HasValue ||
                    x.UserProduct.UserId == specParams.UserId
            )
        )
        {

        }
    }
}