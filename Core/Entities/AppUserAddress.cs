namespace Core.Entities
{
    public class AppUserAddress
    {
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}