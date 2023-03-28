using Core.Entities;

namespace API.Dtos
{
    public class ServiceUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
    }
}