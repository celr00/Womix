namespace Core.Dtos
{
    public class AppUserEntityDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Facebook { get; set; }
        public string PhoneNumber { get; set; }
        public string Instagram { get; set; }
        public AppUserPhotoDto AppUserPhoto { get; set; }
        public AppUserCurriculumDto AppUserCurriculum { get; set; }
        public AppUserAddressDto AppUserAddress { get; set; }
        public bool ShowAddress { get; set; }
    }
}