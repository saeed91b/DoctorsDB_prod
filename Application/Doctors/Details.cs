using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class Details
    {
        public class Query : IRequest<Result<Doctor>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Doctor>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Doctor>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors.Include(d => d.Ratings).FirstOrDefaultAsync(d => d.Id == request.Id);

                if (doctor == null) return null;

                return Result<Doctor>.Success(doctor);
            }
        }
    }
}