using Core.Entities;

namespace Core.Specifications
{
    public class JobsSpecification : BaseSpecification<Job>
    {
        public JobsSpecification(JobSpecParams jobParams)
            : base(x =>
            (string.IsNullOrEmpty(jobParams.Search) || 
            x.Name.ToLower().Contains(jobParams.Search) ||
            x.Description.ToLower().Contains(jobParams.Search) ||
            x.UserJob.User.FirstName.ToLower().Contains(jobParams.Search) ||
            x.UserJob.User.LastName.ToLower().Contains(jobParams.Search)
            ) &&
            (!jobParams.AreaId.HasValue || x.JobArea.AreaId == jobParams.AreaId) &&
            (!jobParams.UserId.HasValue || x.UserJob.UserId == jobParams.UserId) &&
            (
                !jobParams.FollowerId.HasValue ||
                x.UserJobInterests.Any(item => item.UserId == jobParams.FollowerId)
            )
            )
        {
            AddInclude(x => x.JobArea);
            AddInclude(x => x.UserJob);
            AddInclude(x => x.UserJob.User);
            AddInclude(x => x.UserJobInterests);
            AddOrderBy(x => x.Name);
            ApplyPaging(jobParams.PageSize * (jobParams.PageIndex - 1),
                jobParams.PageSize);

            if (!string.IsNullOrEmpty(jobParams.Sort))
            {
                switch (jobParams.Sort)
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
                    case "areaAsc":
                        AddOrderBy(x => x.JobArea.Area.Name);
                        break;
                    case "areaDesc":
                        AddOrderByDescending(x => x.JobArea.Area.Name);
                        break;
                    case "salaryAsc":
                        AddOrderBy(p => p.Salary);
                        break;
                    case "salaryDesc":
                        AddOrderByDescending(p => p.Salary);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public JobsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.JobArea);
            AddInclude(x => x.UserJob);
            AddInclude(x => x.UserJob.User);
            AddInclude(x => x.UserJobInterests);
        }
    }
}