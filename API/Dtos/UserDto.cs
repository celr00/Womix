namespace API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}