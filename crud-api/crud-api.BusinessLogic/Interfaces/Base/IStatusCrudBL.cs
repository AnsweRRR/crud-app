namespace crud_api.BusinessLogic.Interfaces.Base
{
    public interface IStatusCrudBL<DTO> : ICrudBL<DTO>
    {
        Task SetActive(IList<int> selectedIds);
        Task SetInactive(IList<int> selectedIds);
    }
}
