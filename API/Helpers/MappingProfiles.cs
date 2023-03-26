using API.Dtos;
using AutoMapper;
using Core.Entities;
using API.Extensions;

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

            CreateMap<AppUser, UserToReturnDto>()
                .ForMember(dest => dest.FullName, opt =>
                    opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.AppUserPhoto.Photo.Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForPath(dest => dest.Address.City, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.City))
                .ForPath(dest => dest.Address.Id, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.Id))
                .ForPath(dest => dest.Address.Number, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.Number))
                .ForPath(dest => dest.Address.State, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.State))
                .ForPath(dest => dest.Address.Street, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.Street))
                .ForPath(dest => dest.Address.Zipcode, opt =>
                    opt.MapFrom(src => src.AppUserAddress.Address.Zipcode));
        }
    }
}