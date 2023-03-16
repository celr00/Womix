using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}