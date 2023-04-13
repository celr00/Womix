using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class JobAreaConfiguration : IEntityTypeConfiguration<JobArea>
    {
        public void Configure(EntityTypeBuilder<JobArea> builder)
        {
            builder
                .HasKey(x => new {
                    x.JobId,
                    x.AreaId
                });

            builder
                .HasOne(x => x.Area)
                .WithMany(x => x.JobAreas)
                .HasForeignKey(x => x.AreaId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Job)
                .WithOne(x => x.JobArea)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.JobId).IsRequired();
            builder.Property(x => x.AreaId).IsRequired();

            builder.Navigation(x => x.Job).AutoInclude();
            builder.Navigation(x => x.Area).AutoInclude();
        }
    }
}