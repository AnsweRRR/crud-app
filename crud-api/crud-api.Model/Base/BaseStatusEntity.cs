namespace crud_api.Model.Base
{
    public class BaseStatusEntity : AuditableEntityBase
    {
        public bool IsActive { get; set; } = true;
    }
}
