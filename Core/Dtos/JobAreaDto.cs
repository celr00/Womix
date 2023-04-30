namespace Core.Dtos
{
    public class JobAreaDto
    {
        public int JobId { get; set; }
        public int AreaId { get; set; }
        public AreaDto Area { get; set; }
    }
}