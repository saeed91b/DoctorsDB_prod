namespace Domain
{
    public class Doctor
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public int NumberOfFavorites { get; set; } = 0;
        public float AverageRating { get; set; } = 0;
        public ICollection<Rating> Ratings { get; set; } = new List<Rating> ();
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}