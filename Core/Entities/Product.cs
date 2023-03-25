namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int StockQuantity { get; set; }
        public List<ProductPhoto> ProductPhotos { get; set; }
        public ProductItemClass ProductItemClass { get; set; }
        public AppUserProduct AppUserProduct { get; set; }
    }
}