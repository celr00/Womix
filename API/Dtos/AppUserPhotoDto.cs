using Core.Entities;

namespace API.Dtos
{
    public class AppUserPhotoDto
    {
        public int UserId { get; set; }
        public int PhotoId { get; set; }
        public PhotoDto Photo { get; set; }
    }
}