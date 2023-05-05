using Core.Entities;

namespace Core.Dtos
{
    public class ServiceUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
    }
}