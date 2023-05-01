using Core.Entities;

namespace Core.Specifications
{
    public class JobsWithFiltersForCountSpecification : BaseSpecification<Job>
    {
        public JobsWithFiltersForCountSpecification(JobSpecParams specParams) : base
        (x =>
            (
                string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search)
            ) &&
            (
                !specParams.UserId.HasValue ||
                    specParams.UserId == x.UserJob.UserId
            ) &&
            (
                !specParams.AreaId.HasValue ||
                    specParams.AreaId == x.JobArea.AreaId
            ) &&
            (
                !specParams.FollowerId.HasValue ||
                    x.UserJobInterests.Any(x => x.UserId == specParams.FollowerId)
            )
        )
        {

        }
    }
}