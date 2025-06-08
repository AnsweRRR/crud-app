using crud_api.BusinessLogic.DTOs;
using crud_api.BusinessLogic.Interfaces.Base;
using crud_api.DataAccess.DataAccess;
using crud_api.Model.Base;
using Microsoft.EntityFrameworkCore;

namespace crud_api.BusinessLogic.Services.Base
{
    public abstract class BaseCrudBL<Entity, DTO>(AppDbContext _dbContext) where Entity : AuditableEntityBase where DTO : IBaseCrudDTO
    {
        public abstract Entity CreateEntity(DTO dto);
        public abstract DTO MapFromEntity(Entity entity);
        public abstract Entity UpdateEntity(Entity entity, DTO dto);

        public async Task<DTO> Create(DTO dto)
        {
            ValidateCreate(dto);

            Entity entity = CreateEntity(dto);

            await _dbContext.Set<Entity>().AddAsync(entity);
            _dbContext.SaveChanges();

            dto = await GetItemById(entity.Id);
            return dto;
        }

        public virtual void ValidateCreate(DTO dto) { }

        public async Task<DTO> GetItemById(int id)
        {
            Entity? entity = await _dbContext.Set<Entity>().FindAsync(id);

            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            return MapFromEntity(entity);
        }

        public async Task<DTO> Update(DTO dto)
        {
            ValidateUpdate(dto);

            Entity? entity = await _dbContext.Set<Entity>().FindAsync(dto.Id!.Value);

            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            entity = UpdateEntity(entity, dto);

            _dbContext.Set<Entity>().Update(entity);
            _dbContext.SaveChanges();

            dto = await GetItemById(dto.Id!.Value);

            return dto;
        }

        public virtual void ValidateUpdate(DTO dto) { }

        public async Task<IList<int>> Delete(IList<int> selectedIds)
        {
            IList<Entity> entities = await _dbContext.Set<Entity>().Where(x => selectedIds.Contains(x.Id)).ToListAsync();

            _dbContext.Set<Entity>().RemoveRange(entities);
            _dbContext.SaveChanges();

            return selectedIds;
        }

        public async Task<AuditDataDTO> GetItemAuditData(int id)
        {
            Entity? entity = await _dbContext.Set<Entity>().FindAsync(id);

            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            AuditDataDTO auditDataDTO = new AuditDataDTO()
            {
                Id = entity.Id,
                CreateDateTime = entity.CreateDateTime,
                CreatedBy = entity.CreatedBy,
                ModifiedBy = entity.ModifiedBy,
                ModifyDateTime = entity.ModifyDateTime
            };

            return auditDataDTO;
        }
    }
}
