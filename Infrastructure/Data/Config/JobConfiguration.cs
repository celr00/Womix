using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder
                .HasOne(x => x.JobArea)
                .WithOne(x => x.Job)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.UserJob)
                .WithOne(x => x.Job)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.JobArea).AutoInclude();
            builder.Navigation(x => x.UserJob).AutoInclude();
        }
    }
}