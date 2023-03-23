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
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(u => u.UserProducts)
                .WithOne(x => x.Owner)
                .HasForeignKey(x => x.OwnerId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}