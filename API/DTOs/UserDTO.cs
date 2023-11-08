using Domain;

namespace API.DTOs
{
    public class UserDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public ICollection<Doctor> Favorites { get; set; }
    }
}