namespace Core.Dtos
{
    public class PasswordResetWithTokenDto
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}