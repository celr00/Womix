namespace Core.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public List<ServiceCategory> ServiceCategories { get; set; }
    }
}