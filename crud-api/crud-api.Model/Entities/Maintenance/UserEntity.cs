using crud_api.Model.Base;

namespace crud_api.Model.Entities.Maintenance
{
    public class UserEntity : BaseStatusEntity
    {
        public string Name { get; set; } = null!;
        public string? Comment { get; set; }
        public string? Email { get; set; }
        public int Role { get; set; } // should be enum
    }
}
