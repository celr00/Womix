using Core.Entities;

namespace Core.Dtos
{
    public class AppUserAddressDto
    {
        public int UserId { get; set; }
        public int AddressId { get; set; }
        public AddressDto Address { get; set; }
    }
}