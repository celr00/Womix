namespace Core.Dtos
{
    public class UserJobDto
    {
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public int JobId { get; set; }
    }
}