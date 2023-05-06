using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AppUserCurriculumConfiguration: IEntityTypeConfiguration<AppUserCurriculum>
    {

        public void Configure(EntityTypeBuilder<AppUserCurriculum> builder)
        {
            builder.HasKey(x => new {
                x.CurriculumId,
                x.UserId
            });
            
            // builder
            //     .HasOne(x => x.Photo)
            //     .WithOne()
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder
            //     .HasOne(x => x.User)
            //     .WithOne(x => x.AppUserPhoto)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Navigation(x => x.Curriculum).AutoInclude();
        }
    }
}