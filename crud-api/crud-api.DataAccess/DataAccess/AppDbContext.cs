using crud_api.DataAccess.ExceptionHandling;
using crud_api.DataAccess.Helpers;
using crud_api.Model.Base.Interfaces;
using crud_api.Model.Entities.Maintenance;
using Microsoft.EntityFrameworkCore;

namespace crud_api.DataAccess.DataAccess
{
    public class AppDbContext : DbContext
    {

        //private readonly IHttpContextAccessor _httpContextAccessor;
        // private readonly IDbExceptionTranslator _exTranslator;
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            // _httpContextAccessor = this.GetService<IHttpContextAccessor>();
            // _exTranslator = this.GetService<IDbExceptionTranslator>();
        }

        // Tables
        public DbSet<UserEntity> Users { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.SetFKDeleteBehaviour(DeleteBehavior.Restrict);
            modelBuilder.SetNavPropertiesRequiredBasedOnRequiredAttribute();
            modelBuilder.SetCreateTimeDBDefault();
        }

        private void SetAuditData()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is IAuditableEntity
                        && (e.State == EntityState.Added || e.State == EntityState.Modified));

            if (entries.Any())
            {
                string currentUser = "API";
                DateTime now = DateTime.Now;

                foreach (var entityEntry in entries)
                {
                    if (entityEntry.State == EntityState.Added)
                    {
                        ((IAuditableEntity)entityEntry.Entity).CreateDateTime = now;
                        ((IAuditableEntity)entityEntry.Entity).CreatedBy = currentUser;
                    }
                    else
                    {
                        ((IAuditableEntity)entityEntry.Entity).ModifyDateTime = now;
                        ((IAuditableEntity)entityEntry.Entity).ModifiedBy = currentUser;
                    }
                }
            }
        }

        public override int SaveChanges()
        {
            return SaveChanges(true);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            try
            {
                SetAuditData();
                return base.SaveChanges(acceptAllChangesOnSuccess);
            }
            catch (DbUpdateException originalException)
            {
                if (originalException is TranslatedDbUpdateException)
                {
                    throw;
                }

                // throw _exTranslator.Translate(originalException);
                throw;
            }
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await SaveChangesAsync(true, cancellationToken);
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                SetAuditData();
                return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            }
            catch (DbUpdateException originalException)
            {
                if (originalException is TranslatedDbUpdateException)
                {
                    throw;
                }

                // throw _exTranslator.Translate(originalException);
                throw;
            }
        }
    }
}
