


using Microsoft.EntityFrameworkCore;
using ParceirosComerciais.Models;

namespace ParceirosComerciais.Database
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {  }

        public DbSet<Parceiro> Parceiros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Parceiro>(entity =>
            {
                entity.ToTable("Parceiros");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id)
                    .HasDefaultValueSql("NEWID()");
            });
        }
    }

}