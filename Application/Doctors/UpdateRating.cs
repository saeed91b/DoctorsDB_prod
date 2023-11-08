using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class UpdateRating
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public ushort Score { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors.Include(d => d.Ratings).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (doctor == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var rating = doctor.Ratings.FirstOrDefault(x => x.UserName == user.UserName);

                if (rating != null)
                {
                    rating.Score = (float)request.Score;
                }

                else
                {
                    doctor.Ratings.Add(new Rating {UserName = user.UserName, Score = (float)request.Score});
                }

                doctor.AverageRating = doctor.Ratings.Select(x => x.Score).Average();

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating rating!"); 
            }
        }
    }
}