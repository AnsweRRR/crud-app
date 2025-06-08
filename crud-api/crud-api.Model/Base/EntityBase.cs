using System.ComponentModel.DataAnnotations;

namespace crud_api.Model.Base
{
    public class EntityBase
    {
        [Key]
        public int Id { get; set; }
    }
}
