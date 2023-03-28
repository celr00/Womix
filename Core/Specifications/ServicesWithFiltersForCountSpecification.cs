using Core.Entities;

namespace Core.Specifications
{
    public class ServicesWithFiltersForCountSpecification: BaseSpecification<Service>
    {
        public ServicesWithFiltersForCountSpecification(ServiceSpecParams specParams) : base
        (x =>
            (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search))
        )
        {

        }
    }
}