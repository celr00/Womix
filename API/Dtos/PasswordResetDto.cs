namespace API.Dtos
{
    public class PasswordResetDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}