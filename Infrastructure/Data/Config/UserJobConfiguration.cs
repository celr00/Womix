using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class UserJobConfiguration : IEntityTypeConfiguration<UserJob>
    {
        public void Configure(EntityTypeBuilder<UserJob> builder)
        {
            builder
                .HasKey(x => new {
                    x.UserId,
                    x.JobId
                });
            
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.JobId).IsRequired();

            builder.Navigation(x => x.Job).AutoInclude();
        }
    }
}