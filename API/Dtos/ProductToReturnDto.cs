namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public List<ProductPhotoDto> ProductPhotos { get; set; }
        public string ProductItemClass { get; set; }
        public SellerDto Seller { get; set; }
        public int StockQuantity { get; set; }
    }
}