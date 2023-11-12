using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            // AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>().HasMany(e => e.Favorites).WithMany();
            modelBuilder.Entity<Appointment>(x => x.HasKey(x => new {x.AppUserId, x.DoctorId}));
            modelBuilder.Entity<Appointment>().HasOne(x => x.AppUser).WithMany(x => x.Appointments).HasForeignKey(x => x.AppUserId);
            modelBuilder.Entity<Appointment>().HasOne(x => x.Doctor).WithMany(x => x.Appointments).HasForeignKey(x => x.DoctorId);
            modelBuilder.Entity<Comment>().HasOne(x => x.Doctor).WithMany(x => x.Comments).OnDelete(DeleteBehavior.Cascade);
        }
    }
}