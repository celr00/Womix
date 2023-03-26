using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AppUserAddressConfiguration : IEntityTypeConfiguration<AppUserAddress>
    {
        public void Configure(EntityTypeBuilder<AppUserAddress> builder)
        {
            builder
                .HasKey(x => new {
                    x.UserId,
                    x.AddressId
                });

            builder
                .HasOne(x => x.User)
                .WithOne(x => x.AppUserAddress)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Address)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.AddressId).IsRequired();

            builder.Navigation(x => x.Address).AutoInclude();
        }
    }
}