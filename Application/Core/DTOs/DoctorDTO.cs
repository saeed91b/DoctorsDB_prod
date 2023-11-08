using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Core.DTOs
{
    public class DoctorDTO
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
        public ICollection<Rating> Ratings { get; set; } = new List<Rating> ();
        public ICollection<DoctorAppointmentDTO> Appointments { get; set; } = new List<DoctorAppointmentDTO>();
    }
}