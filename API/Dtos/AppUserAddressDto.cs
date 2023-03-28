using Core.Entities;

namespace API.Dtos
{
    public class AppUserAddressDto
    {
        public int UserId { get; set; }
        public int AddressId { get; set; }
        public AddressDto Address { get; set; }
    }
}