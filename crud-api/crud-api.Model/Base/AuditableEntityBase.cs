using crud_api.Model.Base.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace crud_api.Model.Base
{
    public class AuditableEntityBase : EntityBase, IAuditableEntity
    {
        public static readonly string PROP_CREATE_DATE_TIME = nameof(CreateDateTime);

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public string CreatedBy { get; set; } = null!;
        public DateTime? ModifyDateTime { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
