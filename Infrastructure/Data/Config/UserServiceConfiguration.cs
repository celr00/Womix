using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class UserServiceConfiguration : IEntityTypeConfiguration<UserService>
    {
        public void Configure(EntityTypeBuilder<UserService> builder)
        {
            builder
                .HasKey(x => new {
                    x.UserId,
                    x.ServiceId
                });
            
            builder
                .HasOne(x => x.User)
                .WithMany(x => x.Services)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Service)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.ServiceId).IsRequired();

            builder.Navigation(x => x.Service).AutoInclude();
        }
    }
}