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
                new AppUser 
                {
                    PhoneNumber="8120800336",
                    AppUserPhoto = new AppUserPhoto { UserId = 1, Photo = new Photo {Url = "https://res.cloudinary.com/dmjdskgd4/image/upload/v1675982651/aztpqt3s3mesxfzmnj4a.jpg"}},
                    AppUserAddress = new AppUserAddress {
                        UserId = 1,
                        Address = new Address { City = "San Pedro Garza García", Number = "220", State = "Nuevo León", Street="La Gloria", Zipcode="66247"}
                    },
                    Facebook="ramiro_castellanos",
                    Instagram="ramiro_castellanos_barron",
                    FirstName = "Ramiro", LastName = "Castellanos", Email = "ramiro@castellanosbarron.com",
                    UserName = "ramiro@castellanosbarron.com"},
                new AppUser 
                {
                    PhoneNumber="8441106618",
                    AppUserPhoto = new AppUserPhoto { UserId = 2, Photo = new Photo {Url = "https://res.cloudinary.com/dmjdskgd4/image/upload/v1679779808/Dulce_Mar%C3%ADa_evllph.png"}},
                    AppUserAddress = new AppUserAddress{
                        UserId = 2,
                        Address = new Address { City = "Santa Catarina", Number = "111", State = "Nuevo León", Street="Bugambilias", Zipcode="66362"}
                    },
                    Facebook="dulce_trevinio",
                    Instagram="dulcetleal",
                    FirstName = "Dulce", LastName = "Treviño", Email = "dm.trevino05@gmail.com",
                    UserName = "dm.trevino05@gmail.com"},
                new AppUser 
                {
                    PhoneNumber="8111068751",
                    AppUserPhoto = new AppUserPhoto { UserId = 3, Photo = new Photo {Url = "https://res.cloudinary.com/dmjdskgd4/image/upload/v1679779808/Mam%C3%A1_rrpy0j.png"}},
                    AppUserAddress = new AppUserAddress{
                        UserId = 3,
                        Address = new Address { City = "San Pedro Garza García", Number = "220", State = "Nuevo León", Street="La Gloria", Zipcode="66247"}
                    },
                    Facebook="vero_barron_castellanos",
                    Instagram="vero.barrondecastellanos",
                    FirstName = "Vero", LastName = "Barrón", Email = "vero.castellanos@castelec.com.mx",
                    UserName = "vero.castellanos@castelec.com.mx"},
                new AppUser 
                {
                    PhoneNumber="8111068749",
                    AppUserPhoto = new AppUserPhoto { UserId = 4, Photo = new Photo {Url = "https://res.cloudinary.com/dmjdskgd4/image/upload/v1679779808/Pap%C3%A1_bhkji8.png"}},
                    AppUserAddress = new AppUserAddress{
                        UserId = 4,
                        Address = new Address { City = "San Pedro Garza García", Number = "220", State = "Nuevo León", Street="La Gloria", Zipcode="66247"}
                    },
                    Facebook="a_castellanos_leal",
                    Instagram="alexcastellanosl",
                    FirstName = "Alejandro", LastName = "Castellanos", Email = "alejandro.castellanos@castelec.com.mx",
                    UserName = "alejandro.castellanos@castelec.com.mx"},
                new AppUser 
                {
                    PhoneNumber="8189893100",
                    AppUserPhoto = new AppUserPhoto { UserId = 5, Photo = new Photo {Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/800px-Mercedes-Benz_Star_2022.svg.png"}},
                    AppUserAddress = new AppUserAddress{
                        UserId = 5,
                        Address = new Address { City = "Monterrey", Number = "700", State = "Nuevo León", Street=" José Eleuterio Gonzalez", Zipcode="64640"}
                    },
                    Facebook="MercedesBenzMX",
                    Instagram="mercedesbenz",
                    FirstName = "Mercedes", LastName = "Benz", Email = "admin@mercedesbenz.com",
                    UserName = "admin@mercedesbenz.com"},
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
                if(user.Email =="ramiro@castellanosbarron.com")
                    await userManager.AddToRoleAsync(user, "Admin");
                else
                    await userManager.AddToRoleAsync(user, "Member");
            }

            // Products

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if(!context.ItemClasses.Any())
            {
                var classes = new List<ItemClass>()
                {
                    new ItemClass { Name = "Clothing & Accesories"},
                    new ItemClass { Name = "Travel"},
                    new ItemClass { Name = "Home & Garden"},
                    new ItemClass { Name = "Food & Beverages"},
                    new ItemClass { Name = "Health & Beauty"},
                    new ItemClass { Name = "Sports & Outdoors"},
                    new ItemClass { Name = "Electronics"},
                    new ItemClass { Name = "Toys & Entertainment"},
                };
                context.ItemClasses.AddRange(classes);
            }

            if(!context.Categories.Any())
            {
                var categories = new List<Category>()
                {
                    new Category { Name = "Cleaning"},
                    new Category { Name = "Event Planning & Coordinator"},
                    new Category { Name = "Cooking & Meal Preparation"},
                    new Category { Name = "Babysitting"},
                    new Category { Name = "Home Improvement"},
                    new Category { Name = "Errand & Concierge"},
                    new Category { Name = "Pet Care"},
                    new Category { Name = "Health & Fitness"},
                };
                context.Categories.AddRange(categories);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

            if(!context.Areas.Any())
            {
                var areas = new List<Area>()
                {
                    new Area { Name = "Engineering",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 1,
                            Photo = new Photo
                            {
                                Url = "https://static.vecteezy.com/system/resources/previews/000/129/874/original/vector-free-engineering-icons.jpg"
                            }
                        }
                    },
                    new Area { Name = "Finance",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 2,
                            Photo = new Photo
                            {
                                Url = "https://www.pngkit.com/png/detail/296-2967118_conclusion-finance-icon.png"
                            }
                        }
                    },
                    new Area { Name = "Marketing",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 3,
                            Photo = new Photo
                            {
                                Url = "https://image.similarpng.com/very-thumbnail/2020/08/Marketing-with-like-and-star-icons-on-transparent-background-PNG.png"
                            }
                        }
                    },
                    new Area { Name = "Customer Suppoert",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 4,
                            Photo = new Photo
                            {
                                Url = "https://static.vecteezy.com/system/resources/previews/001/222/490/original/customer-service-concept-in-flat-style-design-vector.jpg"
                            }
                        }
                    },
                    new Area { Name = "Human Resources",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 5,
                            Photo = new Photo
                            {
                                Url = "https://thumbs.dreamstime.com/b/flat-design-icon-human-resources-management-searching-professional-staff-analyzing-resume-recruitment-work-hr-vector-65253654.jpg"
                            }
                        }
                    },
                    new Area { Name = "Sales Manager",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 6,
                            Photo = new Photo
                            {
                                Url = "https://img.freepik.com/premium-vector/flat-design-concept-sales-social-media-digital-marketing_18660-487.jpg"
                            }
                        }
                    },
                    new Area { Name = "Project Manager",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 7,
                            Photo = new Photo
                            {
                                Url = "https://media.istockphoto.com/id/1399269037/vector/business-roadmap-flat-design-vector-illustration-with-white-background.jpg?s=612x612&w=0&k=20&c=6bEX7_lmVOrR0ry-zeOB0Pldgz7DbN32unDp6DUJhqg="
                            }
                        }
                    },
                    new Area { Name = "Administrative Assistant",
                        AreaPhoto = new AreaPhoto
                        {
                            AreaId = 8,
                            Photo = new Photo
                            {
                                Url = "https://img.freepik.com/premium-vector/assistant-manager-bussiness-woman-flat-design-concept_578300-289.jpg"
                            }
                        }
                    },
                };
                context.Areas.AddRange(areas);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

            if (!context.UserProducts.Any())
            {
                var userProducts = new List<UserProduct>()
                {
                    new UserProduct
                    {
                        UserId = 1,
                        Product = new Product
                        {
                            Name = "Surface Laptop 4",
                            Description = "Microsoft Surface Laptop 4 con pantalla táctil de 13.5 pulgadas, procesador AMD Ryzen 5 Surface Edition, Memoria RAM de 8GB, y 256GB disco de estado sólido (Plata)",
                            Price = 11870,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SurfaceLaptop4_tbmnl_es-mx?scl=1"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71yC2B6zmEL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61L+WZakwBL.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61YyBesJqcL.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 1
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 1,
                        Product = new Product
                        {
                            Name = "Alienware AW17R4",
                            Description = "Alienware 15 R4 AW15R4-7712SLV-PUS 15.6\" Full HD Gaming Laptop (8th Generation Intel Core i7-8750H, 16GB DDR4 RAM, 256GB SSD/1TB HDD) with NVIDIA GTX 1060",
                            Price = 57350,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71Cwk-wa8+L._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71j3ERDIjzL._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://q7g5k9w5.rocketcdn.me/wp-content/uploads/2022/03/41WgwKBfp2L._AC_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.notebookcheck.org/uploads/tx_nbc2/aw17r4.png"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 2
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 1,
                        Product = new Product
                        {
                            Name = "Apple Watch Series SE",
                            Description = "Apple Watch SE (2a Generación) (GPS) Smartwatch con Caja de Aluminio Color Medianoche de 40 mm y Correa Deportiva Color Medianoche. Seguimiento del Sueño, Detección de Choques, Resistente al Agua",
                            Price = 1000,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-44-alum-midnight-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1661467213478"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUU3_VW_34FR+watch-44-alum-silver-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171096000%2C1661467372120"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPGN3ref_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_MX+watch-face-41-nike7s-desertberry-spruceaura_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660757980710%2C1661754116175%2C1662143398264"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_PF+watch-40-alum-silver-cell-se_VW_PF_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171032000%2C1661469403393"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 5,
                                ProductId = 3
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 1,
                        Product = new Product
                        {
                            Name = "iPhone 11",
                            Description = "Apple iPhone 11, Totalmente Desbloqueado, 128 GB, Negro (Reacondicionado)",
                            Price = 7670,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/612kg3rGyYL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn1.coppel.com/images/catalog/mkp/776/5000/7763042-1.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.shopify.com/s/files/1/0329/7096/5129/products/ventiapp-image--84f1a1e0-9fc0-4e2b-bdff-b9e5707f3860_27_5_2022_13_15_43_683_720x720.jpg?v=1671490096"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.apple.com/newsroom/images/tile-images/Apple_iPhone-11-Pro_Most-Powerful-Advanced_091019.jpg.news_app_ed.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 7,
                                ProductId = 4
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 1,
                        Product = new Product
                        {
                            Name = "Toyota Corolla 2015",
                            Description = "Gold Earings with Blue Saphire",
                            Price = 2499,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.telemundodeportes.com/sites/default/files/2015/07/13/toyota-corolla-2015-4.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.autoproyecto.com/wp-content/uploads/2015/04/62794.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://mediaracing.files.wordpress.com/2015/05/2014_toyota_corolla_s_010_52203_2524_low.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://autoprice.com.mx/imgs/fotos/3566/989ae165eac546c9_ap.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 5
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 2,
                        Product = new Product
                        {
                            Name = "Surface Laptop 4",
                            Description = "Microsoft Surface Laptop 4 con pantalla táctil de 13.5 pulgadas, procesador AMD Ryzen 5 Surface Edition, Memoria RAM de 8GB, y 256GB disco de estado sólido (Plata)",
                            Price = 11870,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SurfaceLaptop4_tbmnl_es-mx?scl=1"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71yC2B6zmEL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61L+WZakwBL.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61YyBesJqcL.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 1
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 2,
                        Product = new Product
                        {
                            Name = "Alienware AW17R4",
                            Description = "Alienware 15 R4 AW15R4-7712SLV-PUS 15.6\" Full HD Gaming Laptop (8th Generation Intel Core i7-8750H, 16GB DDR4 RAM, 256GB SSD/1TB HDD) with NVIDIA GTX 1060",
                            Price = 57350,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71Cwk-wa8+L._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71j3ERDIjzL._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://q7g5k9w5.rocketcdn.me/wp-content/uploads/2022/03/41WgwKBfp2L._AC_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.notebookcheck.org/uploads/tx_nbc2/aw17r4.png"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 2
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 2,
                        Product = new Product
                        {
                            Name = "Apple Watch Series SE",
                            Description = "Apple Watch SE (2a Generación) (GPS) Smartwatch con Caja de Aluminio Color Medianoche de 40 mm y Correa Deportiva Color Medianoche. Seguimiento del Sueño, Detección de Choques, Resistente al Agua",
                            Price = 1000,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-44-alum-midnight-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1661467213478"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUU3_VW_34FR+watch-44-alum-silver-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171096000%2C1661467372120"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPGN3ref_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_MX+watch-face-41-nike7s-desertberry-spruceaura_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660757980710%2C1661754116175%2C1662143398264"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_PF+watch-40-alum-silver-cell-se_VW_PF_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171032000%2C1661469403393"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 5,
                                ProductId = 3
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 2,
                        Product = new Product
                        {
                            Name = "iPhone 11",
                            Description = "Apple iPhone 11, Totalmente Desbloqueado, 128 GB, Negro (Reacondicionado)",
                            Price = 7670,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/612kg3rGyYL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn1.coppel.com/images/catalog/mkp/776/5000/7763042-1.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.shopify.com/s/files/1/0329/7096/5129/products/ventiapp-image--84f1a1e0-9fc0-4e2b-bdff-b9e5707f3860_27_5_2022_13_15_43_683_720x720.jpg?v=1671490096"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.apple.com/newsroom/images/tile-images/Apple_iPhone-11-Pro_Most-Powerful-Advanced_091019.jpg.news_app_ed.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 7,
                                ProductId = 4
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 2,
                        Product = new Product
                        {
                            Name = "Toyota Corolla 2015",
                            Description = "Gold Earings with Blue Saphire",
                            Price = 2499,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.telemundodeportes.com/sites/default/files/2015/07/13/toyota-corolla-2015-4.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.autoproyecto.com/wp-content/uploads/2015/04/62794.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://mediaracing.files.wordpress.com/2015/05/2014_toyota_corolla_s_010_52203_2524_low.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://autoprice.com.mx/imgs/fotos/3566/989ae165eac546c9_ap.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 5
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 3,
                        Product = new Product
                        {
                            Name = "Surface Laptop 4",
                            Description = "Microsoft Surface Laptop 4 con pantalla táctil de 13.5 pulgadas, procesador AMD Ryzen 5 Surface Edition, Memoria RAM de 8GB, y 256GB disco de estado sólido (Plata)",
                            Price = 11870,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SurfaceLaptop4_tbmnl_es-mx?scl=1"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71yC2B6zmEL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61L+WZakwBL.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61YyBesJqcL.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 1
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 3,
                        Product = new Product
                        {
                            Name = "Alienware AW17R4",
                            Description = "Alienware 15 R4 AW15R4-7712SLV-PUS 15.6\" Full HD Gaming Laptop (8th Generation Intel Core i7-8750H, 16GB DDR4 RAM, 256GB SSD/1TB HDD) with NVIDIA GTX 1060",
                            Price = 57350,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71Cwk-wa8+L._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71j3ERDIjzL._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://q7g5k9w5.rocketcdn.me/wp-content/uploads/2022/03/41WgwKBfp2L._AC_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.notebookcheck.org/uploads/tx_nbc2/aw17r4.png"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 2
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 3,
                        Product = new Product
                        {
                            Name = "Apple Watch Series SE",
                            Description = "Apple Watch SE (2a Generación) (GPS) Smartwatch con Caja de Aluminio Color Medianoche de 40 mm y Correa Deportiva Color Medianoche. Seguimiento del Sueño, Detección de Choques, Resistente al Agua",
                            Price = 1000,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-44-alum-midnight-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1661467213478"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUU3_VW_34FR+watch-44-alum-silver-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171096000%2C1661467372120"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPGN3ref_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_MX+watch-face-41-nike7s-desertberry-spruceaura_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660757980710%2C1661754116175%2C1662143398264"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_PF+watch-40-alum-silver-cell-se_VW_PF_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171032000%2C1661469403393"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 5,
                                ProductId = 3
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 3,
                        Product = new Product
                        {
                            Name = "iPhone 11",
                            Description = "Apple iPhone 11, Totalmente Desbloqueado, 128 GB, Negro (Reacondicionado)",
                            Price = 7670,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/612kg3rGyYL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn1.coppel.com/images/catalog/mkp/776/5000/7763042-1.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.shopify.com/s/files/1/0329/7096/5129/products/ventiapp-image--84f1a1e0-9fc0-4e2b-bdff-b9e5707f3860_27_5_2022_13_15_43_683_720x720.jpg?v=1671490096"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.apple.com/newsroom/images/tile-images/Apple_iPhone-11-Pro_Most-Powerful-Advanced_091019.jpg.news_app_ed.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 7,
                                ProductId = 4
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 3,
                        Product = new Product
                        {
                            Name = "Toyota Corolla 2015",
                            Description = "Gold Earings with Blue Saphire",
                            Price = 2499,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.telemundodeportes.com/sites/default/files/2015/07/13/toyota-corolla-2015-4.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.autoproyecto.com/wp-content/uploads/2015/04/62794.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://mediaracing.files.wordpress.com/2015/05/2014_toyota_corolla_s_010_52203_2524_low.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://autoprice.com.mx/imgs/fotos/3566/989ae165eac546c9_ap.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 5
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 4,
                        Product = new Product
                        {
                            Name = "Surface Laptop 4",
                            Description = "Microsoft Surface Laptop 4 con pantalla táctil de 13.5 pulgadas, procesador AMD Ryzen 5 Surface Edition, Memoria RAM de 8GB, y 256GB disco de estado sólido (Plata)",
                            Price = 11870,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SurfaceLaptop4_tbmnl_es-mx?scl=1"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71yC2B6zmEL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61L+WZakwBL.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 1,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61YyBesJqcL.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 1
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 4,
                        Product = new Product
                        {
                            Name = "Alienware AW17R4",
                            Description = "Alienware 15 R4 AW15R4-7712SLV-PUS 15.6\" Full HD Gaming Laptop (8th Generation Intel Core i7-8750H, 16GB DDR4 RAM, 256GB SSD/1TB HDD) with NVIDIA GTX 1060",
                            Price = 57350,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71Cwk-wa8+L._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/71j3ERDIjzL._AC_SY355_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://q7g5k9w5.rocketcdn.me/wp-content/uploads/2022/03/41WgwKBfp2L._AC_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 2,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.notebookcheck.org/uploads/tx_nbc2/aw17r4.png"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 6,
                                ProductId = 2
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 4,
                        Product = new Product
                        {
                            Name = "Apple Watch Series SE",
                            Description = "Apple Watch SE (2a Generación) (GPS) Smartwatch con Caja de Aluminio Color Medianoche de 40 mm y Correa Deportiva Color Medianoche. Seguimiento del Sueño, Detección de Choques, Resistente al Agua",
                            Price = 1000,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-44-alum-midnight-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1661467213478"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUU3_VW_34FR+watch-44-alum-silver-nc-se_VW_34FR_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171096000%2C1661467372120"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPGN3ref_VW_34FR+watch-40-alum-starlight-nc-se_VW_34FR_WF_CO_GEO_MX+watch-face-41-nike7s-desertberry-spruceaura_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660757980710%2C1661754116175%2C1662143398264"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 3,
                                    Photo = new Photo 
                                    {
                                        Url = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_PF+watch-40-alum-silver-cell-se_VW_PF_WF_CO_GEO_MX?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171032000%2C1661469403393"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 5,
                                ProductId = 3
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 4,
                        Product = new Product
                        {
                            Name = "iPhone 11",
                            Description = "Apple iPhone 11, Totalmente Desbloqueado, 128 GB, Negro (Reacondicionado)",
                            Price = 7670,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://m.media-amazon.com/images/I/612kg3rGyYL._AC_SL1500_.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn1.coppel.com/images/catalog/mkp/776/5000/7763042-1.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.shopify.com/s/files/1/0329/7096/5129/products/ventiapp-image--84f1a1e0-9fc0-4e2b-bdff-b9e5707f3860_27_5_2022_13_15_43_683_720x720.jpg?v=1671490096"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 4,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.apple.com/newsroom/images/tile-images/Apple_iPhone-11-Pro_Most-Powerful-Advanced_091019.jpg.news_app_ed.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 7,
                                ProductId = 4
                            }
                        },
                    },
                    new UserProduct
                    {
                        UserId = 4,
                        Product = new Product
                        {
                            Name = "Toyota Corolla 2015",
                            Description = "Gold Earings with Blue Saphire",
                            Price = 2499,
                            StockQuantity = 1,
                            ProductPhotos = new List<ProductPhoto>()
                            {
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://www.telemundodeportes.com/sites/default/files/2015/07/13/toyota-corolla-2015-4.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://cdn.autoproyecto.com/wp-content/uploads/2015/04/62794.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://mediaracing.files.wordpress.com/2015/05/2014_toyota_corolla_s_010_52203_2524_low.jpg"
                                    }
                                },
                                new ProductPhoto
                                {
                                    ProductId = 5,
                                    Photo = new Photo 
                                    {
                                        Url = "https://autoprice.com.mx/imgs/fotos/3566/989ae165eac546c9_ap.jpg"
                                    }
                                },
                            },
                            ProductItemClass = new ProductItemClass
                            {
                                ItemClassId = 3,
                                ProductId = 5
                            }
                        },
                    },
                };
                context.UserProducts.AddRange(userProducts);
            }

            if (!context.UserServices.Any())
            {
                var userServices = new List<UserService>()
                {
                    new UserService
                    {
                        UserId = 1,
                        Service = new Service
                        {
                            Name = "House deep clean",
                            Description = "House deep clean with electric vacum cleaner",
                            Price = 699,
                            ServiceCategory = new ServiceCategory
                            {
                                ServiceId = 1,
                                CategoryId = 1
                            },
                            ServicePhotos = new List<ServicePhoto>()
                            {
                                new ServicePhoto
                                {
                                    ServiceId = 1,
                                    Photo = new Photo
                                    {
                                        Url = "https://thumbs.dreamstime.com/b/building-cleaning-service-dust-removal-vacuum-cleaner-worker-cleaning-removing-construction-dust-vacuum-cleaner-109337471.jpg"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 1,
                                    Photo = new Photo
                                    {
                                        Url = "https://previews.123rf.com/images/luckybusiness/luckybusiness1603/luckybusiness160300059/54016312-housewife-from-cleaning-service-cleans-carpet-with-vacuum-cleaner.jpg"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 1,
                                    Photo = new Photo
                                    {
                                        Url = "https://shinycarpetcleaning.com/wp-content/uploads/2020/07/Benefits-of-Hiring-Professional-Carpet-Cleaning-Services-768x540-1.jpg"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 1,
                                    Photo = new Photo
                                    {
                                        Url = "https://s3.envato.com/files/269465229/DSC_1762%20copy.jpg"
                                    }
                                },
                            }
                        }
                    },
                    new UserService
                    {
                        UserId = 1,
                        Service = new Service
                        {
                            Name = "One night baby sitting",
                            Description = "From the afternoon to the next day morning baby sitting up to 2 children below ages of 5",
                            Price = 1099,
                            ServiceCategory = new ServiceCategory
                            {
                                ServiceId = 2,
                                CategoryId = 2
                            },
                            ServicePhotos = new List<ServicePhoto>()
                            {
                                new ServicePhoto
                                {
                                    ServiceId = 2,
                                    Photo = new Photo
                                    {
                                        Url = "https://images.prismic.io/netmums/ff95d4c1fe1345359f02e2c50836740deb3b8e4b_babysitter.jpg?auto=compress,format"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 2,
                                    Photo = new Photo
                                    {
                                        Url = "https://www.liveabout.com/thmb/bAGLHfIisyJspCsmr1_ZYwkkGmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/girl-feeding-baby-brother-at-table-145064470-5ac1e6ee642dca00363ebd0c.jpg"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 2,
                                    Photo = new Photo
                                    {
                                        Url = "https://images.ctfassets.net/xf6mqlbz6glx/2mWl3wWE59kyF9R0x586oX/eea99dd7f31a58cddd314b46c5758709/Newborns-babysitter_coloring_with_girl_on_couch-Babysitter.jpg.jpg?fm=jpg&fl=progressive&w=960&q=80"
                                    }
                                },
                                new ServicePhoto
                                {
                                    ServiceId = 2,
                                    Photo = new Photo
                                    {
                                        Url = "https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/f/94/f94af1b0-06e7-11ed-8db1-b3b2c74f528d/62d5dd35a1404.image.jpg?resize=1200%2C800"
                                    }
                                },
                            }
                        }
                    },
                };
                context.UserServices.AddRange(userServices);
            }

            if (!context.UserJobs.Any())
            {
                var userJobs = new List<UserJob>()
                {
                    new UserJob
                    {
                        UserId = 5,
                        Job = new Job
                        {
                            Name = "Software Engineer",
                            Description = "Full time software engineer with full-stack capabilities fluent in python and JS",
                            Salary = 25349,
                            JobArea = new JobArea
                            {
                                JobId = 1,
                                AreaId = 1
                            },
                        }
                    },
                    new UserJob
                    {
                        UserId = 5,
                        Job = new Job
                        {
                            Name = "Content Creator & Marketing",
                            Description = "Marketing fulltime job with experience with Adobe suite",
                            Salary = 14999,
                            JobArea = new JobArea
                            {
                                JobId = 2,
                                AreaId = 3
                            },
                        }
                    },
                };
                context.UserJobs.AddRange(userJobs);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
