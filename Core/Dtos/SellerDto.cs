namespace Core.Dtos
{
    public class SellerDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}