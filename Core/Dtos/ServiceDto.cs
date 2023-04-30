namespace Core.Dtos
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public List<ServicePhotoDto> ServicePhotos { get; set; }
        public ServiceCategoryDto ServiceCategory { get; set; }
        public UserServiceDto UserService { get; set; }
    }
}