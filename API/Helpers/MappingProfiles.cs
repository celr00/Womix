using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(dest => dest.ProductItemClass,
                    opt => opt.MapFrom(src => 
                        src.ProductItemClass.ItemClass.Name))
                .ForMember(dest => dest.Seller,
                    opt => opt.MapFrom(src =>
                    src.AppUserProduct.Owner));
                // .ForMember(dest => dest.Seller.Facebook,
                //     opt => opt.MapFrom(src => 
                //         src.AppUserProduct.Owner.Facebook))
                // .ForMember(dest => dest.Seller.Instagram,
                //     opt => opt.MapFrom(src => 
                //         src.AppUserProduct.Owner.Instagram))
                // .ForMember(dest => dest.Seller.FullName,
                //     opt => opt.MapFrom(src => 
                //         src.AppUserProduct.Owner.FirstName + " " + src.AppUserProduct.Owner.LastName));

            CreateMap<ProductPhoto, ProductPhotoDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<AppUser, SellerDto>()
                .ForMember(dest => dest.FullName,
                    opt => opt.MapFrom(src =>
                    src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.Instagram,
                    opt => opt.MapFrom(src =>
                    src.Instagram))
                .ForMember(dest => dest.Facebook,
                    opt => opt.MapFrom(src =>
                    src.Facebook))
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(src =>
                    src.Id));
        }
    }
}