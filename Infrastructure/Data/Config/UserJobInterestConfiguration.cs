using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class UserJobInterestConfiguration : IEntityTypeConfiguration<UserJobInterest>
    {
        public void Configure(EntityTypeBuilder<UserJobInterest> builder)
        {
            builder.HasKey(x => new {
                x.JobId,
                x.UserId
            });
            
            builder
                .HasOne(x => x.Job)
                .WithMany(x => x.UserJobInterests)
                .HasForeignKey(x => x.JobId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.FollowingJobs)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.Job).AutoInclude();
        }
    }
}