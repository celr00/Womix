﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230414213840_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("Core.Entities.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Number")
                        .HasColumnType("TEXT");

                    b.Property<string>("State")
                        .HasColumnType("TEXT");

                    b.Property<string>("Street")
                        .HasColumnType("TEXT");

                    b.Property<string>("Zipcode")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("Core.Entities.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Core.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Facebook")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Instagram")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Core.Entities.AppUserAddress", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AddressId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "AddressId");

                    b.HasIndex("AddressId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AppUserAddresses");
                });

            modelBuilder.Entity("Core.Entities.AppUserPhoto", b =>
                {
                    b.Property<int>("PhotoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PhotoId", "UserId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AppUserPhotos");
                });

            modelBuilder.Entity("Core.Entities.AppUserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Core.Entities.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("Core.Entities.AreaPhoto", b =>
                {
                    b.Property<int>("AreaId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PhotoId")
                        .HasColumnType("INTEGER");

                    b.HasKey("AreaId", "PhotoId");

                    b.HasIndex("AreaId")
                        .IsUnique();

                    b.HasIndex("PhotoId");

                    b.ToTable("AreaPhoto");
                });

            modelBuilder.Entity("Core.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Core.Entities.Connection", b =>
                {
                    b.Property<string>("ConnectionId")
                        .HasColumnType("TEXT");

                    b.Property<string>("GroupName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("ConnectionId");

                    b.HasIndex("GroupName");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("Core.Entities.Group", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Name");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Core.Entities.ItemClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ItemClasses");
                });

            modelBuilder.Entity("Core.Entities.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("Salary")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("Core.Entities.JobArea", b =>
                {
                    b.Property<int>("JobId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AreaId")
                        .HasColumnType("INTEGER");

                    b.HasKey("JobId", "AreaId");

                    b.HasIndex("AreaId");

                    b.HasIndex("JobId")
                        .IsUnique();

                    b.ToTable("JobAreas");
                });

            modelBuilder.Entity("Core.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateRead")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("MessageSent")
                        .HasColumnType("TEXT");

                    b.Property<bool>("RecipientDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RecipientId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RecipientUsername")
                        .HasColumnType("TEXT");

                    b.Property<bool>("SenderDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SenderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderUsername")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Core.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Core.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("StockQuantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Core.Entities.ProductItemClass", b =>
                {
                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ItemClassId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ProductId", "ItemClassId");

                    b.HasIndex("ItemClassId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("ProductItemClasses");
                });

            modelBuilder.Entity("Core.Entities.ProductPhoto", b =>
                {
                    b.Property<int>("PhotoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PhotoId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductPhotos");
                });

            modelBuilder.Entity("Core.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("Core.Entities.ServiceCategory", b =>
                {
                    b.Property<int>("ServiceId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ServiceId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ServiceId")
                        .IsUnique();

                    b.ToTable("ServiceCategories");
                });

            modelBuilder.Entity("Core.Entities.ServicePhoto", b =>
                {
                    b.Property<int>("PhotoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ServiceId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PhotoId", "ServiceId");

                    b.HasIndex("PhotoId")
                        .IsUnique();

                    b.HasIndex("ServiceId");

                    b.ToTable("ServicePhotos");
                });

            modelBuilder.Entity("Core.Entities.UserJob", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("JobId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "JobId");

                    b.HasIndex("JobId")
                        .IsUnique();

                    b.ToTable("UserJobs");
                });

            modelBuilder.Entity("Core.Entities.UserJobInterest", b =>
                {
                    b.Property<int>("SourceUserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TargetUserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("SourceUserId", "TargetUserId");

                    b.HasIndex("TargetUserId");

                    b.ToTable("UserJobInterests");
                });

            modelBuilder.Entity("Core.Entities.UserLike", b =>
                {
                    b.Property<int>("SourceUserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TargetUserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("SourceUserId", "TargetUserId");

                    b.HasIndex("TargetUserId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("Core.Entities.UserProduct", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "ProductId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("UserProducts");
                });

            modelBuilder.Entity("Core.Entities.UserService", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ServiceId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "ServiceId");

                    b.HasIndex("ServiceId")
                        .IsUnique();

                    b.ToTable("UserServices");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Core.Entities.AppUserAddress", b =>
                {
                    b.HasOne("Core.Entities.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithOne("AppUserAddress")
                        .HasForeignKey("Core.Entities.AppUserAddress", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Address");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.AppUserPhoto", b =>
                {
                    b.HasOne("Core.Entities.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithOne("AppUserPhoto")
                        .HasForeignKey("Core.Entities.AppUserPhoto", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Photo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.AppUserRole", b =>
                {
                    b.HasOne("Core.Entities.AppRole", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithOne("UserRole")
                        .HasForeignKey("Core.Entities.AppUserRole", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.AreaPhoto", b =>
                {
                    b.HasOne("Core.Entities.Area", "Area")
                        .WithOne("AreaPhoto")
                        .HasForeignKey("Core.Entities.AreaPhoto", "AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");

                    b.Navigation("Photo");
                });

            modelBuilder.Entity("Core.Entities.Connection", b =>
                {
                    b.HasOne("Core.Entities.Group", null)
                        .WithMany("Connections")
                        .HasForeignKey("GroupName");
                });

            modelBuilder.Entity("Core.Entities.JobArea", b =>
                {
                    b.HasOne("Core.Entities.Area", "Area")
                        .WithMany("JobAreas")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Core.Entities.Job", "Job")
                        .WithOne("JobArea")
                        .HasForeignKey("Core.Entities.JobArea", "JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");

                    b.Navigation("Job");
                });

            modelBuilder.Entity("Core.Entities.Message", b =>
                {
                    b.HasOne("Core.Entities.AppUser", "Recipient")
                        .WithMany("MessagesReceived")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "Sender")
                        .WithMany("MessagesSent")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Recipient");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("Core.Entities.ProductItemClass", b =>
                {
                    b.HasOne("Core.Entities.ItemClass", "ItemClass")
                        .WithMany("ProductItemClasses")
                        .HasForeignKey("ItemClassId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Core.Entities.Product", "Product")
                        .WithOne("ProductItemClass")
                        .HasForeignKey("Core.Entities.ProductItemClass", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItemClass");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Core.Entities.ProductPhoto", b =>
                {
                    b.HasOne("Core.Entities.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Product", "Product")
                        .WithMany("ProductPhotos")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Core.Entities.ServiceCategory", b =>
                {
                    b.HasOne("Core.Entities.Category", "Category")
                        .WithMany("ServiceCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Core.Entities.Service", "Service")
                        .WithOne("ServiceCategory")
                        .HasForeignKey("Core.Entities.ServiceCategory", "ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("Core.Entities.ServicePhoto", b =>
                {
                    b.HasOne("Core.Entities.Photo", "Photo")
                        .WithOne()
                        .HasForeignKey("Core.Entities.ServicePhoto", "PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Service", "Service")
                        .WithMany("ServicePhotos")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Photo");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("Core.Entities.UserJob", b =>
                {
                    b.HasOne("Core.Entities.Job", "Job")
                        .WithOne("UserJob")
                        .HasForeignKey("Core.Entities.UserJob", "JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithMany("UserJobs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Job");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.UserJobInterest", b =>
                {
                    b.HasOne("Core.Entities.AppUser", "SourceUser")
                        .WithMany("Following")
                        .HasForeignKey("SourceUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "TargetUser")
                        .WithMany("Followed")
                        .HasForeignKey("TargetUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SourceUser");

                    b.Navigation("TargetUser");
                });

            modelBuilder.Entity("Core.Entities.UserLike", b =>
                {
                    b.HasOne("Core.Entities.AppUser", "SourceUser")
                        .WithMany("LikedUsers")
                        .HasForeignKey("SourceUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "TargetUser")
                        .WithMany("LikedByUsers")
                        .HasForeignKey("TargetUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SourceUser");

                    b.Navigation("TargetUser");
                });

            modelBuilder.Entity("Core.Entities.UserProduct", b =>
                {
                    b.HasOne("Core.Entities.Product", "Product")
                        .WithOne("UserProduct")
                        .HasForeignKey("Core.Entities.UserProduct", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithMany("UserProducts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.UserService", b =>
                {
                    b.HasOne("Core.Entities.Service", "Service")
                        .WithOne("UserService")
                        .HasForeignKey("Core.Entities.UserService", "ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.AppUser", "User")
                        .WithMany("UserServices")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Service");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Core.Entities.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Core.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Core.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Core.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Core.Entities.AppRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("Core.Entities.AppUser", b =>
                {
                    b.Navigation("AppUserAddress");

                    b.Navigation("AppUserPhoto");

                    b.Navigation("Followed");

                    b.Navigation("Following");

                    b.Navigation("LikedByUsers");

                    b.Navigation("LikedUsers");

                    b.Navigation("MessagesReceived");

                    b.Navigation("MessagesSent");

                    b.Navigation("UserJobs");

                    b.Navigation("UserProducts");

                    b.Navigation("UserRole");

                    b.Navigation("UserServices");
                });

            modelBuilder.Entity("Core.Entities.Area", b =>
                {
                    b.Navigation("AreaPhoto");

                    b.Navigation("JobAreas");
                });

            modelBuilder.Entity("Core.Entities.Category", b =>
                {
                    b.Navigation("ServiceCategories");
                });

            modelBuilder.Entity("Core.Entities.Group", b =>
                {
                    b.Navigation("Connections");
                });

            modelBuilder.Entity("Core.Entities.ItemClass", b =>
                {
                    b.Navigation("ProductItemClasses");
                });

            modelBuilder.Entity("Core.Entities.Job", b =>
                {
                    b.Navigation("JobArea");

                    b.Navigation("UserJob");
                });

            modelBuilder.Entity("Core.Entities.Product", b =>
                {
                    b.Navigation("ProductItemClass");

                    b.Navigation("ProductPhotos");

                    b.Navigation("UserProduct");
                });

            modelBuilder.Entity("Core.Entities.Service", b =>
                {
                    b.Navigation("ServiceCategory");

                    b.Navigation("ServicePhotos");

                    b.Navigation("UserService");
                });
#pragma warning restore 612, 618
        }
    }
}