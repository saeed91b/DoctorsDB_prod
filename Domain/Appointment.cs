using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Appointment
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public DateTime Date { get; set; }
    }
}