namespace Core.Dtos
{
    public class PasswordResetDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}