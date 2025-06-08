using crud_api.BusinessLogic.DTOs.Maintenance;
using crud_api.BusinessLogic.Interfaces.Maintenance;
using Microsoft.AspNetCore.Mvc;

namespace crud_api.Controllers.Maintenance
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserBL _crudBL) : BaseStatusCrudController<UserDTO>(_crudBL)
    {
    }
}
