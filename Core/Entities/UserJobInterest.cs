namespace Core.Entities
{
    public class UserJobInterest
    {
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public Job Job { get; set; }
        public int JobId { get; set; }
    }
}