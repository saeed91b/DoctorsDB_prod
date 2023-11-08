using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid DoctorId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            
            public Handler (DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors.Include(x => x.Appointments).ThenInclude(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == request.DoctorId);

                if (doctor == null) return null;

                var appointment = doctor.Appointments.FirstOrDefault(x => x.AppUser.UserName == _userAccessor.GetUserName());

                if (appointment == null) return null;

                doctor.Appointments.Remove(appointment);
                _context.Appointments.Remove(appointment);

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to cancel appoitnment!");

            }
        }
    }
}