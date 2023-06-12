using Core.Entities;

namespace Core.Specifications
{
    public class PhotoSpecification : BaseSpecification<Photo>
    {
        public PhotoSpecification(PhotoSpecParams photoParams)
            : base(x =>
            (
                string.IsNullOrEmpty(photoParams.Search)
            ) &&
            (
                !photoParams.Visible.HasValue || x.Visible == photoParams.Visible
            )
            )
        {
            ApplyPaging(photoParams.PageSize * (photoParams.PageIndex - 1),
                photoParams.PageSize);

            if (!string.IsNullOrEmpty(photoParams.Sort))
            {
                switch (photoParams.Sort)
                {
                    case "idAsc":
                        AddOrderBy(x => x.Id);
                        break;
                    case "idDesc":
                        AddOrderByDescending(x => x.Id);
                        break;
                    case "urlAsc":
                        AddOrderBy(x => x.Url);
                        break;
                    case "urlDesc":
                        AddOrderByDescending(x => x.Url);
                        break;
                    case "visibleAsc":
                        AddOrderBy(p => p.Visible);
                        break;
                    case "visibleDesc":
                        AddOrderByDescending(p => p.Visible);
                        break;
                    default:
                        AddOrderBy(n => n.Visible);
                        break;
                }
            }
        }

        public PhotoSpecification(int id) : base(x => x.Id == id)
        {
        }
    }
}