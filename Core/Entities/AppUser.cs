using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public List<AppUserProduct> UserProducts { get; set; }
    }
}