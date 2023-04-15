namespace Core.Entities
{
    public class JobArea
    {
        public int JobId { get; set; }
        public Job Job { get; set; }
        public int AreaId { get; set; }
        public Area Area { get; set; }
    }
}