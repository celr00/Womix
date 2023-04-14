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
                x.SourceUserId,
                x.TargetUserId
            });
            
            builder
                .HasOne(s => s.TargetUser)
                .WithMany(l => l.Followed)
                .HasForeignKey(s => s.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.Following)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}