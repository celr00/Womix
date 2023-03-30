namespace API.Dtos
{
    public class UserProductDto
    {
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public int ProductId { get; set; }
    }
}