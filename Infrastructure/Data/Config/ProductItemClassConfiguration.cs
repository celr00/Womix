using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductItemClassConfiguration : IEntityTypeConfiguration<ProductItemClass>
    {
        public void Configure(EntityTypeBuilder<ProductItemClass> builder)
        {
            builder
                .HasKey(x => new {
                    x.ProductId,
                    x.ItemClassId
                });
            
            builder
                .HasOne(x => x.Product)
                .WithOne(x => x.ProductItemClass);

            builder
                .HasOne(x => x.ItemClass)
                .WithMany(x => x.ProductItemClasses)
                .HasForeignKey(x => x.ItemClassId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Navigation(x => x.ItemClass).AutoInclude();
        }
    }
}