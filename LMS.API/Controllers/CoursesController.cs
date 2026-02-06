using LMS.Application.DTOs;
using LMS.Infrastructure.Data;
using LMS.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CoursesController(AppDbContext db)
    {
        _db = db;
    }

    // ------------------------
    // Get all courses
    // ------------------------
    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        var courses = _db.Courses.ToList();
        return Ok(courses);
    }

    // ------------------------
    // Get course by id
    // ------------------------
    [Authorize]
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var course = _db.Courses.Find(id);
        if (course == null) return NotFound();
        return Ok(course);
    }

    // ------------------------
    // Create course (Admin)
    // ------------------------
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public IActionResult Create(CreateCourseDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Description = dto.Description,
            YoutubeUrl = dto.YoutubeUrl
        };

        _db.Courses.Add(course);
        _db.SaveChanges();

        return Ok(course);
    }

    // ------------------------
    // Update course (Admin)
    // ------------------------
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public IActionResult Update(int id, CreateCourseDto dto)
    {
        var course = _db.Courses.Find(id);

        if (course == null)
            return NotFound();

        course.Title = dto.Title;
        course.Description = dto.Description;
        course.YoutubeUrl = dto.YoutubeUrl;

        _db.SaveChanges();

        return Ok(course);
    }

    // ------------------------
    // Delete course (Admin)
    // ------------------------
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var course = _db.Courses.Find(id);

        if (course == null)
            return NotFound();

        _db.Courses.Remove(course);
        _db.SaveChanges();

        return Ok("Deleted");
    }
}
