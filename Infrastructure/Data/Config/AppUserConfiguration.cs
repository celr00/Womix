using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder
                .HasOne(u => u.UserRole)
                .WithOne(x => x.User)
                .HasForeignKey<AppUserRole>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(u => u.UserProducts)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(u => u.UserServices)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(u => u.UserJobs)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(x => x.FollowingJobs)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.AppUserPhoto)
                .WithOne(x => x.User)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.AppUserAddress)
                .WithOne(x => x.User)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.AppUserPhoto).AutoInclude();
            builder.Navigation(x => x.AppUserAddress).AutoInclude();
            builder.Navigation(x => x.UserServices).AutoInclude();
            builder.Navigation(x => x.UserProducts).AutoInclude();
            builder.Navigation(x => x.UserRole).AutoInclude();
        }
    }
}
