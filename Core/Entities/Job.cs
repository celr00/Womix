namespace Core.Entities
{
    public class Job : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Salary { get; set; }
        public JobArea JobArea { get; set; }
        public UserJob UserJob { get; set; }
    }
}