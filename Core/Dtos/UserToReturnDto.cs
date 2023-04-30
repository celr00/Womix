using Core.Entities;

namespace Core.Dtos
{
    public class UserToReturnDto
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public Address Address { get; set; }
    }
}