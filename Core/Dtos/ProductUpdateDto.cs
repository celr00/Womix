using Core.Entities;

namespace Core.Dtos
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public ProductItemClass ProductItemClass { get; set; }
    }
}