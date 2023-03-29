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
            
            // builder
            //     .HasOne(x => x.User)
            //     .WithMany(x => x.UserServices)
            //     .HasForeignKey(x => x.UserId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder
            //     .HasOne(x => x.Service)
            //     .WithOne(x => x.UserService)
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.ServiceId).IsRequired();

            builder.Navigation(x => x.Service).AutoInclude();
        }
    }
}