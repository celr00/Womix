namespace Core.Dtos
{
    public class ProductItemClassDto
    {
        public int ProductId { get; set; }
        public int ItemClassId { get; set; }
        public ItemClassDto ItemClass { get; set; }
    }
}