using crud_api.BusinessLogic.Interfaces.Base;

namespace crud_api.BusinessLogic.DTOs.Maintenance
{
    public class UserDTO : IBaseCrudDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Comment { get; set; }
        public bool IsActive { get; set; }
    }
}
