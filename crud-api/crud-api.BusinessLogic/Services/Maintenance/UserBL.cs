using crud_api.BusinessLogic.DTOs.Maintenance;
using crud_api.BusinessLogic.Interfaces.Maintenance;
using crud_api.BusinessLogic.Services.Base;
using crud_api.DataAccess.DataAccess;
using crud_api.Model.Entities.Maintenance;
using Microsoft.EntityFrameworkCore;

namespace crud_api.BusinessLogic.Services.Maintenance
{
    public class UserBL : BaseStatusCrudBL<UserEntity, UserDTO>, IUserBL
    {
        private readonly AppDbContext _dbContext;
        public UserBL(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IList<UserDTO>> GetItems()
        {
            IList<UserDTO> userDTOs = await _dbContext.Users.Select(entity => new UserDTO()
            {
                Id = entity.Id,
                Name = entity.Name,
                Comment = entity.Comment,
                IsActive = entity.IsActive,
            }).ToListAsync();

            return userDTOs;
        }

        public override UserDTO MapFromEntity(UserEntity entity)
        {
            UserDTO dto = new UserDTO()
            {
                Id = entity.Id,
                Name = entity.Name,
                Comment = entity.Comment,
                IsActive = entity.IsActive,
            };

            return dto;
        }

        public override UserEntity CreateEntity(UserDTO dto)
        {
            UserEntity entity = new UserEntity()
            {
                IsActive = true,
                Name = dto.Name!,
                Comment = dto.Comment,
            };

            return entity;
        }

        public override UserEntity UpdateEntity(UserEntity entity, UserDTO dto)
        {
            entity.Name = dto.Name!;
            entity.Comment = dto.Comment;

            return entity;
        }

        public override void ValidateCreate(UserDTO dto)
        {
            bool nameAlreadyTaken = _dbContext.Users.Any(x => x.Name.Equals(dto.Name));

            if (nameAlreadyTaken)
            {
                throw new Exception("This data has already been recorded.");
            }
        }

        public override void ValidateUpdate(UserDTO dto)
        {
            bool nameAlreadyTaken = _dbContext.Users.Any(x => x.Id != dto.Id && x.Name.Equals(dto.Name));

            if (nameAlreadyTaken)
            {
                throw new Exception("This data has already been recorded.");
            }
        }
    }
}
