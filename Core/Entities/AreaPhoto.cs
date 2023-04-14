namespace Core.Entities
{
    public class AreaPhoto
    {
        public int AreaId { get; set; }
        public Area Area { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
    }
}