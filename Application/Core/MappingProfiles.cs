using Application.Core.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Doctor, DoctorDTO>();

            CreateMap<Appointment, DoctorAppointmentDTO>()
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Date, o => o.MapFrom(s => s.Date));

            CreateMap<Appointment, AppointmentDTO>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DoctorFirstName, o => o.MapFrom(s => s.Doctor.FirstName))
            .ForMember(d => d.DoctorLastName, o => o.MapFrom(s => s.Doctor.LastName));

            CreateMap<Comment, CommentDTO>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName));
        }
    }
}