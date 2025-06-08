using crud_api.BusinessLogic.DTOs;

namespace crud_api.BusinessLogic.Interfaces.Base
{
    public interface ICrudBL<DTO>
    {
        Task<IList<DTO>> GetItems();
        Task<DTO> Create(DTO dto);
        Task<DTO> GetItemById(int id);
        Task<DTO> Update(DTO dto);
        Task<IList<int>> Delete(IList<int> selectedIds);
        Task<AuditDataDTO> GetItemAuditData(int id);
    }
}
