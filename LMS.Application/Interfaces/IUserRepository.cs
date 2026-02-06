using LMS.Domain;

namespace LMS.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUsername(string username);
    Task<User?> GetById(int id);

    Task Add(User user);
    Task Save();

    Task<List<User>> GetPendingUsers();
    Task Activate(int id);
    
    Task<int> CountAll();
    Task<int> CountActive();
    Task<int> CountPending();
}
