namespace API.Dtos
{
    public class AppUserEntityDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public AppUserPhotoDto AppUserPhoto { get; set; }
        public AppUserAddressDto AppUserAddress { get; set; }
    }
}