using Core.Entities;

namespace Core.Specifications
{
    public class ProductsSpecification : BaseSpecification<Product>
    {
        public ProductsSpecification(ProductSpecParams productParams)
            : base(x =>
            (
                string.IsNullOrEmpty(productParams.Search) || 
                x.Name.ToLower().Contains(productParams.Search) ||
                x.Description.ToLower().Contains(productParams.Search) ||
                x.UserProduct.User.FirstName.ToLower().Contains(productParams.Search) ||
                x.UserProduct.User.LastName.ToLower().Contains(productParams.Search)
            ) &&
            (
                !productParams.ItemClassId.HasValue ||
                    x.ProductItemClass.ItemClassId == productParams.ItemClassId
            ) &&
            (
                !productParams.UserId.HasValue || x.UserProduct.UserId == productParams.UserId
            )
            )
        {
            AddInclude(x => x.ProductPhotos);
            AddInclude(x => x.ProductItemClass);
            AddInclude(x => x.UserProduct);
            AddInclude(x => x.UserProduct.User);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1),
                productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "idAsc":
                        AddOrderBy(x => x.Id);
                        break;
                    case "idDesc":
                        AddOrderByDescending(x => x.Id);
                        break;
                    case "nameAsc":
                        AddOrderBy(x => x.Name);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(x => x.Name);
                        break;
                    case "descriptionAsc":
                        AddOrderBy(x => x.Description);
                        break;
                    case "descriptionDesc":
                        AddOrderByDescending(x => x.Description);
                        break;
                    case "itemClassAsc":
                        AddOrderBy(x => x.ProductItemClass.ItemClass.Name);
                        break;
                    case "itemClassDesc":
                        AddOrderByDescending(x => x.ProductItemClass.ItemClass.Name);
                        break;
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
            AddInclude(x => x.UserProduct);
            AddInclude(x => x.UserProduct.User);
        }
    }
}