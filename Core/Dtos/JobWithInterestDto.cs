namespace Core.Dtos
{
    public class JobWithInterestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Salary { get; set; }
        public JobAreaDto JobArea { get; set; }
        public UserJobDto UserJob { get; set; }
        public List<JobInterestWithUserDto> UserJobInterests { get; set; }
    }
}