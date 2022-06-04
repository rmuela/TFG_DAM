namespace API.Context;

using Microsoft.EntityFrameworkCore;
using API.Entities;

public class WeddingContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public WeddingContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
    }

    
    public DbSet<User> Users { get; set; }
    public DbSet<Invitation> Invitations { get; set; }
}