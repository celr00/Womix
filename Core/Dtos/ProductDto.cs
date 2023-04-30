namespace Core.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int StockQuantity { get; set; }
        public List<ProductPhotoDto> ProductPhotos { get; set; }
        public ProductItemClassDto ProductItemClass { get; set; }
        public UserProductDto UserProduct { get; set; }
    }
}