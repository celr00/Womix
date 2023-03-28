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
                .HasMany(u => u.UserRoles)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(u => u.UserProducts)
                .WithOne(x => x.Owner)
                .HasForeignKey(x => x.OwnerId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.AppUserPhoto)
                .WithOne(x => x.User)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.AppUserAddress)
                .WithOne(x => x.User)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.AppUserPhoto).AutoInclude();
            builder.Navigation(x => x.AppUserAddress).AutoInclude();
        }
    }
}