using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AreaConfiguration : IEntityTypeConfiguration<Area>
    {
        public void Configure(EntityTypeBuilder<Area> builder)
        {
            builder
                .HasOne(x => x.AreaPhoto)
                .WithOne(x => x.Area)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.AreaPhoto).AutoInclude();
        }
    }
}