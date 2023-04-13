namespace API.Dtos
{
    public class JobDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Salary { get; set; }
        public JobAreaDto JobArea { get; set; }
        public UserJobDto UserJob { get; set; }
    }
}