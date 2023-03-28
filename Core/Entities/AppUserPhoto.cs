namespace Core.Entities
{
    public class AppUserPhoto
    {
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
    }
}