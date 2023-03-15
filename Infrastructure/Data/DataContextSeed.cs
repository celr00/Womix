using System.Reflection;
using Core.Entities;

namespace Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!context.Products.Any())
            {
                var products = new List<Product>()
                {
                    new Product { Name = "Producto 1"},
                    new Product { Name = "Producto 2"},
                    new Product { Name = "Producto 3"},
                    new Product { Name = "Producto 4"},
                    new Product { Name = "Producto 5"},
                    new Product { Name = "Producto 6"},
                    new Product { Name = "Producto 7"},
                };
                context.Products.AddRange(products);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}