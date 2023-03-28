namespace Core.Entities
{
    public class ProductItemClass
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ItemClassId { get; set; }
        public ItemClass ItemClass { get; set; }
    }
}