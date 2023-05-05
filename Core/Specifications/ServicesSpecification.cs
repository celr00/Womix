using Core.Entities;

namespace Core.Specifications
{
    public class ServicesSpecification : BaseSpecification<Service>
    {
        public ServicesSpecification(ServiceSpecParams serviceParams)
            : base(x =>
            (string.IsNullOrEmpty(serviceParams.Search) || 
            x.Name.ToLower().Contains(serviceParams.Search) ||
            x.Description.ToLower().Contains(serviceParams.Search) ||
            x.UserService.User.FirstName.ToLower().Contains(serviceParams.Search) ||
            x.UserService.User.LastName.ToLower().Contains(serviceParams.Search)
            ) &&
            (!serviceParams.CategoryId.HasValue || x.ServiceCategory.CategoryId == serviceParams.CategoryId) &&
            (!serviceParams.UserId.HasValue || x.UserService.UserId == serviceParams.UserId)
            )
        {
            AddInclude(x => x.ServicePhotos);
            AddInclude(x => x.ServiceCategory);
            AddInclude(x => x.UserService);
            AddInclude(x => x.UserService.User);
            AddOrderBy(x => x.Name);
            ApplyPaging(serviceParams.PageSize * (serviceParams.PageIndex - 1),
                serviceParams.PageSize);

            if (!string.IsNullOrEmpty(serviceParams.Sort))
            {
                switch (serviceParams.Sort)
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
                    case "categoryAsc":
                        AddOrderBy(x => x.ServiceCategory.Category.Name);
                        break;
                    case "categoryDesc":
                        AddOrderByDescending(x => x.ServiceCategory.Category.Name);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ServicesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ServicePhotos);
            AddInclude(x => x.ServiceCategory);
            AddInclude(x => x.UserService);
            AddInclude(x => x.UserService.User);
        }
    }
}