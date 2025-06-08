using crud_api.BusinessLogic.DTOs;
using crud_api.BusinessLogic.Interfaces.Base;
using Microsoft.AspNetCore.Mvc;

namespace crud_api.Controllers
{

    public class BaseCrudController<DTO>(ICrudBL<DTO> _crudBL) : ControllerBase where DTO : new()
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<DTO> dto = await _crudBL.GetItems();

            return Ok(dto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            DTO dto = await _crudBL.GetItemById(id);

            return Ok(dto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(DTO dto)
        {
            dto = await _crudBL.Create(dto);

            return Ok(dto);
        }

        [HttpPatch("edit")]
        public async Task<IActionResult> Edit(DTO dto)
        {
            dto = await _crudBL.Update(dto);

            return Ok(dto);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] IList<int> ids)
        {
            IList<int> deletedIds = await _crudBL.Delete(ids);

            return Ok(deletedIds);
        }

        [HttpGet("audit/{id}")]
        public async Task<IActionResult> Audit(int id)
        {
            AuditDataDTO dto = await _crudBL.GetItemAuditData(id);

            return Ok(dto);
        }
    }
}
