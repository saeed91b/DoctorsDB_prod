using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Core.DTOs;
using MediatR;
using FluentValidation;
using Persistence;
using AutoMapper;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDTO>> 
        {
            public string Body { get; set; }
            public Guid DoctorId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> 
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(x => x.Id == request.DoctorId);

                if (doctor == null) return null;

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var comment = new Comment
                {
                    Author = user,
                    Doctor = doctor,
                    Body = request.Body
                };

                doctor.Comments.Add(comment);
                var commentDTO = _mapper.Map<CommentDTO>(comment);
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<CommentDTO>.Success(commentDTO) : Result<CommentDTO>.Failure("Failed to add comment!");
            }
        }
    }
}