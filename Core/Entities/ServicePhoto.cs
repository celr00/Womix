namespace Core.Entities
{
    public class ServicePhoto
    {
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}