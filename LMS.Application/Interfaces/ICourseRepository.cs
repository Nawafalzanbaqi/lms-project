using LMS.Domain;

namespace LMS.Application.Interfaces;

public interface ICourseRepository
{
    Task<List<Course>> GetAll();
    Task<Course?> GetById(int id);
    Task Add(Course course);
    Task Update(Course course);
    Task Delete(int id);
    Task<int> Count();
}
