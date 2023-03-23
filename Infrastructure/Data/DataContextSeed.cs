using System.Reflection;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            // Identity

            if (await userManager.Users.AnyAsync()) return;

            var users = new List<AppUser>()
            {
                new AppUser { Email = "test@gmail.com", UserName = "test@gmail.com"},
                new AppUser { Email = "test@outlook.com", UserName = "test@outlook.com"},
                new AppUser { Email = "test@hotmail.com", UserName = "test@hotmail.com"},
                new AppUser { Email = "test@yahoo.com", UserName = "test@yahoo.com"},
            };

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin@admin.com",
                Email = "admin@admin.com"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin" });

            // Products

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!context.UserProducts.Any())
            {
                var userProducts = new List<AppUserProduct>()
                {
                    new AppUserProduct
                    {
                        OwnerId = 1,
                        Product = new Product
                        {
                            Name = "Surface Laptop 4",
                            Description = "Intel Core i5 8GB RAM",
                            Price = 15499,
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 1,
                        Product = new Product
                        {
                            Name = "AW17R4",
                            Description = "Intel Core i7 16GB RAM",
                            Price = 35499,
                        },
                    },
                };
                context.UserProducts.AddRange(userProducts);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
