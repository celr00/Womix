using Core.Entities;

namespace Core.Specifications
{
    public class PhotoWithFiltersForCountSpecification: BaseSpecification<Photo>
    {
        public PhotoWithFiltersForCountSpecification(PhotoSpecParams specParams) : base
        (x =>
            (
                !specParams.Visible.HasValue ||
                    x.Visible == specParams.Visible
            )
        )
        {

        }
    }
}