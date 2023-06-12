namespace Core.Entities
{
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool Visible { get; set; } = false;
    }
}