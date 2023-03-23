namespace Core.Entities
{
    public class AppUserProduct
    {
        public int OwnerId { get; set; }
        public AppUser Owner { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}