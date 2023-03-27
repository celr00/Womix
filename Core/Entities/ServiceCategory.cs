namespace Core.Entities
{
    public class ServiceCategory
    {
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}