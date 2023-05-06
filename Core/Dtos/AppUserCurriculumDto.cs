namespace Core.Dtos
{
    public class AppUserCurriculumDto
    {
        public int UserId { get; set; }
        public int CurriculumId { get; set; }
        public CurriculumDto Curriculum { get; set; }
    }
}