using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core.DTOs
{
    public class AppointmentDTO
    {
        public Guid DoctorId { get; set; }
        public string Username { get; set; }
        public string DoctorFirstName { get; set; }
        public string DoctorLastName { get; set; }
        public DateTime Date { get; set; }
    }
}