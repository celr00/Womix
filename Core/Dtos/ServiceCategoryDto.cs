namespace Core.Dtos
{
    public class ServiceCategoryDto
    {
        public int ServiceId { get; set; }
        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }
    }
}