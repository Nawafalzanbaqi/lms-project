using LMS.Application.DTOs;
using LMS.Application.Services;
using LMS.Domain;
using LMS.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    // ------------------------
    // Get all users
    // ------------------------
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _db.Users
            .Select(u => new
            {
                u.Id,
                u.Username,
                u.Role
            })
            .ToList();

        return Ok(users);
    }

    // ------------------------
    // Create user
    // ------------------------
    [HttpPost]
    public IActionResult Create(CreateUserDto dto)
    {
        if (_db.Users.Any(u => u.Username == dto.Username))
            return BadRequest("Username already exists");

        if (dto.Role != "Admin" && dto.Role != "Trainee")
            return BadRequest("Invalid role");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = PasswordHasher.Hash(dto.Password),
            Role = dto.Role
        };

        _db.Users.Add(user);
        _db.SaveChanges();

        return Ok(new
        {
            user.Id,
            user.Username,
            user.Role
        });
    }

    // ------------------------
    // Delete user
    // ------------------------
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _db.Users.Find(id);

        if (user == null)
            return NotFound();

        _db.Users.Remove(user);
        _db.SaveChanges();

        return Ok("User deleted");
    }
}
