using crud_api.BusinessLogic.Interfaces.Base;
using Microsoft.AspNetCore.Mvc;

namespace crud_api.Controllers
{
    public class BaseStatusCrudController<DTO>(IStatusCrudBL<DTO> _statusCrudBL) : BaseCrudController<DTO>(_statusCrudBL) where DTO : new()
    {
        [HttpPost("activate")]
        public async Task<IActionResult> Activate([FromBody] IList<int> ids)
        {
            await _statusCrudBL.SetActive(ids);

            return Ok();
        }

        [HttpPost("inactivate")]
        public async Task<IActionResult> Inactivate([FromBody] IList<int> ids)
        {
            await _statusCrudBL.SetInactive(ids);

            return Ok();
        }
    }
}
