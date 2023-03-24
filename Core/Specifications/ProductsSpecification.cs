using Core.Entities;

namespace Core.Specifications
{
    public class ProductsSpecification : BaseSpecification<Product>
    {
        public ProductsSpecification(ProductSpecParams productParams)
            : base(x =>
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)))
        {
            AddInclude(x => x.ProductPhotos);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1),
                productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductPhotos);
        }
    }
}