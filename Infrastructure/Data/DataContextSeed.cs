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
                new AppUser { Facebook="ramiro_castellanos", Instagram="ramiro_castellanos",FirstName = "Ramiro", LastName = "Castellanos", Email = "ramiro@castellanosbarron.com", UserName = "ramiro@castellanosbarron.com"},
                new AppUser { Facebook="dulce_trevinio", Instagram="dulce_trevinio",FirstName = "Dulce", LastName = "Treviño", Email = "dulce.trevino@udem.edu", UserName = "dulce.trevino@udem.edu"},
                new AppUser { Facebook="vero_barron_castellanos", Instagram="vero_barron_castellanos",FirstName = "Vero", LastName = "Barrón", Email = "vero.castellanos@castelec.com.mx", UserName = "vero.castellanos@castelec.com.mx"},
                new AppUser { Facebook="a_castellanos_leal", Instagram="a_castellanos_leal",FirstName = "Alejandro", LastName = "Castellanos", Email = "alejandro.castellanos@castelec.com.mx", UserName = "alejandro.castellanos@castelec.com.mx"},
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

            if(!context.ItemClasses.Any())
            {
                var classes = new List<ItemClass>()
                {
                    new ItemClass { Name = "Food"},
                    new ItemClass { Name = "Clothing"},
                    new ItemClass { Name = "Clothing Accessories"},
                };
                context.ItemClasses.AddRange(classes);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

            if (!context.UserProducts.Any())
            {
                var userProducts = new List<AppUserProduct>()
                {
                    new AppUserProduct
                    {
                        OwnerId = 2,
                        Product = new Product
                        {
                            Name = "Brownie",
                            Description = "Yummy Brownies with dark chocolate",
                            Price = 129,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://assets.epicurious.com/photos/5fca6f8d9014cc9a8df3d074/5:4/w_2500,h_2000,c_limit/Malted_Forever_Brownies_VOG_final.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://assets.epicurious.com/photos/5fca6f8d9014cc9a8df3d074/5:4/w_2500,h_2000,c_limit/Malted_Forever_Brownies_VOG_final.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 1,
                                ProductId = 1
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 2,
                        Product = new Product
                        {
                            Name = "Red Velvet Cake",
                            Description = "Red Velved Cake with Flour",
                            Price = 599,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.recipetineats.com/wp-content/uploads/2016/06/Red-Velvet-Layer-Cake_4.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.recipetineats.com/wp-content/uploads/2016/06/Red-Velvet-Layer-Cake_4.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 1,
                                ProductId = 2
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 4,
                        Product = new Product
                        {
                            Name = "Red Shirt",
                            Description = "Red Polo T-Shirt",
                            Price = 1000,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://needles.com.pk/image/cache/catalog/Polo/red-500x500.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://needles.com.pk/image/cache/catalog/Polo/red-500x500.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 2,
                                ProductId = 3
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 1,
                        Product = new Product
                        {
                            Name = "Black Shirt",
                            Description = "Black Shirt with Long Sleeves",
                            Price = 1000,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "http://cdn.shopify.com/s/files/1/0210/9734/products/nayked-apparel-men-men-s-ridiculously-soft-long-sleeve-100-cotton-t-shirt-black-small-na0136-20865725431957_1178x.jpg?v=1628441771"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "http://cdn.shopify.com/s/files/1/0210/9734/products/nayked-apparel-men-men-s-ridiculously-soft-long-sleeve-100-cotton-t-shirt-black-small-na0136-20865725431957_1178x.jpg?v=1628441771"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 2,
                                ProductId = 4
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 3,
                        Product = new Product
                        {
                            Name = "Golden Earings",
                            Description = "Gold Earings with Blue Saphire",
                            Price = 2499,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/301376/belleza-jewels-round-halo-detachable-earings_3_display_1656406449_547cd1ae.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/301376/belleza-jewels-round-halo-detachable-earings_3_display_1656406449_547cd1ae.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 5
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 3,
                        Product = new Product
                        {
                            Name = "Silver Necklace",
                            Description = "Silver Necklace with Green Gem",
                            Price = 1349,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 6,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/813AXUIUywL._UF1000,1000_QL80_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 6,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/813AXUIUywL._UF1000,1000_QL80_.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 6
                            }
                        },
                    },
                    new AppUserProduct
                    {
                        OwnerId = 4,
                        Product = new Product
                        {
                            Name = "Obsidian Necklace",
                            Description = "Obsidian Necklace with Green Gem",
                            Price = 1299,
                            StockQuantity = 10,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 7,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41f5enyZWnL.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 7,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41f5enyZWnL.jpg"
                                    }
                                }
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 7
                            }
                        },
                    },
                };
                context.UserProducts.AddRange(userProducts);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
