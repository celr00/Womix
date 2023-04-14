using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AreaPhotoConfiguration : IEntityTypeConfiguration<AreaPhoto>
    {
        public void Configure(EntityTypeBuilder<AreaPhoto> builder)
        {
            builder.HasKey(x => new {
                x.AreaId,
                x.PhotoId
            });

            builder.Navigation(x => x.Area).AutoInclude();
            builder.Navigation(x => x.Photo).AutoInclude();
        }
    }
}