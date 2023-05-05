namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; } = true;
        public List<ProductPhoto> ProductPhotos { get; set; }
        public ProductItemClass ProductItemClass { get; set; }
        public UserProduct UserProduct { get; set; }
    }
}