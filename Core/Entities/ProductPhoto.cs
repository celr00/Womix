namespace Core.Entities
{
    public class ProductPhoto
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
    }
}