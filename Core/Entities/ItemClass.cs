namespace Core.Entities
{
    public class ItemClass : BaseEntity
    {
        public string Name { get; set; }
        public List<ProductItemClass> ProductItemClasses { get; set; }
    }
}