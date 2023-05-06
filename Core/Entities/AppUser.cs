using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public DateOnly DateOfBirth { get; set; }
        public AppUserRole UserRole { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }

        public List<UserProduct> UserProducts { get; set; }
        public List<UserService> UserServices { get; set; }
        
        public List<UserJob> UserJobs { get; set; }
        public List<UserJobInterest> FollowingJobs { get; set; }
        
        public AppUserPhoto AppUserPhoto { get; set; }
        public AppUserCurriculum AppUserCurriculum { get; set; }
        public AppUserAddress AppUserAddress { get; set; }
        
        public List<UserLike> LikedUsers { get; set; }
        public List<UserLike> LikedByUsers { get; set; }


        public List<Message> MessagesSent { get; set; }
        public List<Message> MessagesReceived { get; set; }
    }
}