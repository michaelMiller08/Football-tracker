using Microsoft.EntityFrameworkCore;
using FifaTrackerServer.Models;

namespace FifaTrackerServer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Match> Matches { get; set; }
    }
}
