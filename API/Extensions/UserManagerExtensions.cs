using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public static class UserManagerExtensions
{
    public static async Task<AppUser> FindByPasswordResetTokenAsync(this UserManager<AppUser> userManager, string resetToken)
    {
        var users = await userManager.Users.ToListAsync();

        foreach (var user in users)
        {
            var tokenValid = await userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultProvider, UserManager<AppUser>.ResetPasswordTokenPurpose, resetToken);

            if (tokenValid)
            {
                return user;
            }
        }

        return null;
    }
}