namespace Core.Dtos
{
    public class JobInterestWithUserDto
    {
        public UserToReturnDto User { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
    }
}