using LMS.Domain;

namespace LMS.Application.Interfaces;

public interface IUserService
{
    Task<(string token, User user)?> Login(string username, string password);

    Task Register(string username, string password);

    Task<List<User>> GetPendingUsers();

    Task Activate(int id);
    Task Disable(int id);
    Task<object> GetStats();
}
