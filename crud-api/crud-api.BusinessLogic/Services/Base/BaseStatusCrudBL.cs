using crud_api.BusinessLogic.Interfaces.Base;
using crud_api.DataAccess.DataAccess;
using crud_api.Model.Base;
using Microsoft.EntityFrameworkCore;

namespace crud_api.BusinessLogic.Services.Base
{
    public abstract class BaseStatusCrudBL<Entity, DTO> : BaseCrudBL<Entity, DTO>
        where Entity : BaseStatusEntity
        where DTO : IBaseCrudDTO
    {
        private readonly AppDbContext _dbContext;
        public BaseStatusCrudBL(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SetActive(IList<int> selectedIds)
        {
            IList<Entity> entities = await _dbContext.Set<Entity>().Where(entity => selectedIds.Contains(entity.Id)).ToListAsync();

            foreach (Entity entity in entities)
            {
                entity.IsActive = true;
            }

            _dbContext.UpdateRange(entities);
            _dbContext.SaveChanges();
        }

        public async Task SetInactive(IList<int> selectedIds)
        {
            IList<Entity> entities = await _dbContext.Set<Entity>().Where(entity => selectedIds.Contains(entity.Id)).ToListAsync();

            foreach (Entity entity in entities)
            {
                entity.IsActive = false;
            }

            _dbContext.UpdateRange(entities);
            _dbContext.SaveChanges();
        }
    }
}
