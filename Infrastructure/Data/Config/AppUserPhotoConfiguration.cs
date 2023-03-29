using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AppUserPhotoConfiguration : IEntityTypeConfiguration<AppUserPhoto>
    {
        public void Configure(EntityTypeBuilder<AppUserPhoto> builder)
        {
            builder.HasKey(x => new {
                x.PhotoId,
                x.UserId
            });
            
            // builder
            //     .HasOne(x => x.Photo)
            //     .WithOne()
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder
            //     .HasOne(x => x.User)
            //     .WithOne(x => x.AppUserPhoto)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.Photo).AutoInclude();
        }
    }
}