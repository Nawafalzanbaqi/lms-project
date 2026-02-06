using LMS.Application.Interfaces;
using LMS.Domain;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly AppDbContext _context;

    public CourseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Course>> GetAll()
    {
        return await _context.Courses.ToListAsync();
    }

    public async Task<Course?> GetById(int id)
    {
        return await _context.Courses.FindAsync(id);
    }

    public async Task Add(Course course)
    {
        await _context.Courses.AddAsync(course);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Course course)
    {
        _context.Courses.Update(course);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course != null)
        {
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<int> Count()
    {
        return await _context.Courses.CountAsync();
    }
}
