using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class UpdateFavorite
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var doctor = await _context.Doctors.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (doctor == null) return null;

                var user = await _context.Users.Include(u => u.Favorites)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var favorite = user.Favorites.FirstOrDefault(x => x.Id == request.Id);

                if (favorite != null)
                {
                    user.Favorites.Remove(favorite);
                    doctor.NumberOfFavorites -= 1;
                }

                else
                {
                    user.Favorites.Add(doctor);
                    doctor.NumberOfFavorites += 1;
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem adding or removing favorite!"); 
            }
        }
    }
}