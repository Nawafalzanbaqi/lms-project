using LMS.Application.DTOs;
using LMS.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _service;

    public AuthController(IUserService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        try
        {
            var result = await _service.Login(dto.Username, dto.Password);

            if (result == null)
                return Unauthorized();

            return Ok(new
            {
                token = result.Value.token,
                role = result.Value.user.Role,
                username = result.Value.user.Username
            });
        }
        catch (Exception ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        await _service.Register(dto.Username, dto.Password);
        return Ok("Wait for admin approval");
    }
}