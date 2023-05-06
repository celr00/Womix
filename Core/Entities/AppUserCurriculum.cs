namespace Core.Entities
{
    public class AppUserCurriculum
    {
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public int CurriculumId { get; set; }
        public Curriculum Curriculum { get; set; }

    }
}