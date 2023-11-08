using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Application.Core.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class List
    {
        public class Query : IRequest<Result<List<AppointmentDTO>>> {}

        public class Handler : IRequestHandler<Query, Result<List<AppointmentDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<AppointmentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointments = await _context.Appointments.ProjectTo<AppointmentDTO>(_mapper.ConfigurationProvider).ToListAsync();

                if (appointments == null) return null;

                return Result<List<AppointmentDTO>>.Success(appointments);
            }
        }
    }
}