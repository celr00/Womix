namespace Core.Entities
{
    public class Service : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ServicePhoto> ServicePhotos { get; set; }
        public ServiceCategory ServiceCategory { get; set; }
        public UserService UserService { get; set; }
    }
}