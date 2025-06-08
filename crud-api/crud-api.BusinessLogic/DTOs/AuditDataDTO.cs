namespace crud_api.BusinessLogic.DTOs
{
    public class AuditDataDTO
    {
        public int Id { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime? ModifyDateTime { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
