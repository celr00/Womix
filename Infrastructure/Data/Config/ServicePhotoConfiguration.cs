using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ServicePhotoConfiguration : IEntityTypeConfiguration<ServicePhoto>
    {
        public void Configure(EntityTypeBuilder<ServicePhoto> builder)
        {
            builder
                .HasKey(x => new {
                    x.PhotoId,
                    x.ServiceId
                });

            builder
                .HasOne(x => x.Photo)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.Service)
                .WithMany(x => x.ServicePhotos)
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.PhotoId).IsRequired();
            builder.Property(x => x.ServiceId).IsRequired();

            builder.Navigation(x => x.Photo).AutoInclude();
            builder.Navigation(x => x.Service).AutoInclude();
        }
    }
}