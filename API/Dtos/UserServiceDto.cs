namespace API.Dtos
{
    public class UserServiceDto
    {
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public int ServiceId { get; set; }
    }
}