using Core.Entities;

namespace API.Dtos
{
    public class JobUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
        public string Description { get; set; }
        public JobArea JobArea { get; set; }
    }
}