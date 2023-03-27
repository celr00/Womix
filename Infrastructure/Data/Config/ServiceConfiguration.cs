using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder
                .HasMany(x => x.ServicePhotos)
                .WithOne(x => x.Service)
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.ServiceCategory)
                .WithOne(x => x.Service)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.ServicePhotos).AutoInclude();
            builder.Navigation(x => x.ServiceCategory).AutoInclude();
        }
    }
}