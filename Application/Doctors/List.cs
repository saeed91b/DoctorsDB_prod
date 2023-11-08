using System.Security.Cryptography.X509Certificates;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Doctor>>> 
        {
            public DoctorParams Params { get; set; }
        };

        public class Handler : IRequestHandler<Query, Result<PagedList<Doctor>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<PagedList<Doctor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  _context.Doctors.Include(d => d.Ratings).AsQueryable();

                if (request.Params.FilterType == "city")
                {
                    query = query.Where(x => x.City == request.Params.FilterValue);
                }

                else if (request.Params.FilterType == "category")
                {
                    query = query.Where(x => x.Category == request.Params.FilterValue);
                }

                if (request.Params.OrderByRating == true)
                {
                    query = query.OrderByDescending(d => d.AverageRating);
                }

                else
                {              
                    query = query.OrderBy(d => d.LastName);
                }

                return Result<PagedList<Doctor>>.Success(await PagedList<Doctor>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
