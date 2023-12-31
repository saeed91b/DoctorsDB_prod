using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid DoctorId { get; set; }
            public string DateString { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(x => x.Id == request.DoctorId);

                if (doctor == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var appointment = new Appointment
                {
                    AppUser = user,
                    Doctor = doctor,
                    Date = DateTime.Parse(request.DateString, styles: DateTimeStyles.AdjustToUniversal)
                };

                doctor.Appointments.Add(appointment);
                _context.Appointments.Add(appointment);

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to create appointment!");
            }
        }
    }
}