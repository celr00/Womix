using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (await userManager.Users.AnyAsync()) return;

            var usersData = File.ReadAllText(path + @"/Data/SeedData/users.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(usersData);

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
                if (user.Email == "ramiro@castellanosbarron.com")
                    await userManager.AddToRoleAsync(user, "Admin");
                else
                    await userManager.AddToRoleAsync(user, "Member");
            }

            if (!context.ItemClasses.Any())
            {
                var data = File.ReadAllText(path + @"/Data/SeedData/items.json");
                var brands = JsonSerializer.Deserialize<List<ItemClass>>(data);
                context.ItemClasses.AddRange(brands);
            }

            if (!context.Categories.Any())
            {
                var data = File.ReadAllText(path + @"/Data/SeedData/categories.json");
                var items = JsonSerializer.Deserialize<List<Category>>(data);
                context.Categories.AddRange(items);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

            if (!context.Areas.Any())
            {
                var data = File.ReadAllText(path + @"/Data/SeedData/areas.json");
                var items = JsonSerializer.Deserialize<List<Area>>(data);
                context.Areas.AddRange(items);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

            if (!context.UserProducts.Any())
            {
                var userProductsData = File.ReadAllText(path + @"/Data/SeedData/user-products.json");
                var userProducts = JsonSerializer.Deserialize<List<UserProduct>>(userProductsData);
                context.UserProducts.AddRange(userProducts);
            }

            if (!context.UserServices.Any())
            {
                var userServicesData = File.ReadAllText(path + @"/Data/SeedData/user-services.json");
                var userServices = JsonSerializer.Deserialize<List<UserService>>(userServicesData);
                context.UserServices.AddRange(userServices);
            }

            if (!context.UserJobs.Any())
            {
                var userJobsData = File.ReadAllText(path + @"/Data/SeedData/user-jobs.json");
                var userJobs = JsonSerializer.Deserialize<List<UserJob>>(userJobsData);
                context.UserJobs.AddRange(userJobs);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}