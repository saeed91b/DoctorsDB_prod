using Application.Core;
using Application.Doctors;
using Application.Interfaces;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddSignalR();
            return services;
        }

    }
}