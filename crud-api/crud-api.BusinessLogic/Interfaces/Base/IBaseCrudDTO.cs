namespace crud_api.BusinessLogic.Interfaces.Base
{
    public interface IBaseCrudDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Comment { get; set; }
        public bool IsActive { get; set; }
    }
}
