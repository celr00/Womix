namespace Core.Entities
{
    public class UserService
    {
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}