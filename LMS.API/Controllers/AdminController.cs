using LMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IUserService _service;

    public AdminController(IUserService service)
    {
        _service = service;
    }

    [HttpGet("pending")]
    public async Task<IActionResult> Pending()
    {
        return Ok(await _service.GetPendingUsers());
    }

    [HttpPost("activate/{id}")]
    public async Task<IActionResult> Activate(int id)
    {
        await _service.Activate(id);
        return Ok();
    }

    [HttpPost("disable/{id}")]
    public async Task<IActionResult> Disable(int id)
    {
        await _service.Disable(id);
        return Ok();
    }

    [HttpGet("stats")]
    public async Task<IActionResult> Stats()
    {
        return Ok(await _service.GetStats());
    }
}
