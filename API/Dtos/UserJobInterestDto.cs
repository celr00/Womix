namespace API.Dtos
{
    public class UserJobInterestDto
    {
        public int UserId { get; set; }
        public JobDto Job { get; set; }
        public int JobId { get; set; }
    }
}