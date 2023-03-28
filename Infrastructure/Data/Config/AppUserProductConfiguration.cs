using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AppUserProductConfiguration : IEntityTypeConfiguration<AppUserProduct>
    {
        public void Configure(EntityTypeBuilder<AppUserProduct> builder)
        {
            builder.HasKey(x => new {
                x.OwnerId,
                x.ProductId
            });
        }
    }
}