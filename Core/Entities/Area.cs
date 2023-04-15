namespace Core.Entities
{
    public class Area: BaseEntity
    {
        public string Name { get; set; }
        public List<JobArea> JobAreas { get; set; }
        public AreaPhoto AreaPhoto { get; set; }
    }
}