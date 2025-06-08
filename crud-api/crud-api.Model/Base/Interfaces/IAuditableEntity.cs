namespace crud_api.Model.Base.Interfaces
{
    public interface IAuditableEntity
    {
        DateTime CreateDateTime { get; set; }
        string CreatedBy { get; set; }
        DateTime? ModifyDateTime { get; set; }
        string? ModifiedBy { get; set; }
    }
}
