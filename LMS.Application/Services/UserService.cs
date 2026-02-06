using LMS.Application.Interfaces;
using LMS.Domain;

namespace LMS.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repo;
    private readonly ICourseRepository _courseRepo;
    private readonly JwtService _jwt;

    public UserService(IUserRepository repo, ICourseRepository courseRepo, JwtService jwt)
    {
        _repo = repo;
        _courseRepo = courseRepo;
        _jwt = jwt;
    }

    public async Task<(string token, User user)?> Login(string username, string password)
    {
        var user = await _repo.GetByUsername(username);

        if (user == null)
            return null;

        if (!PasswordHasher.Verify(password, user.PasswordHash))
            return null;

        if (!user.IsActive)
            throw new Exception("Account not approved");

        var token = _jwt.Generate(user);

        return (token, user);
    }

    public async Task Register(string username, string password)
    {
        var exists = await _repo.GetByUsername(username);
        if (exists != null)
            throw new Exception("User exists");

        var user = new User
        {
            Username = username,
            PasswordHash = PasswordHasher.Hash(password),
            Role = "Trainee",
            IsActive = false,
            CreatedAt = DateTime.UtcNow
        };

        await _repo.Add(user);
        await _repo.Save();
    }

    public async Task<List<User>> GetPendingUsers()
    {
        return await _repo.GetPendingUsers();
    }

    public async Task Activate(int id)
    {
        await _repo.Activate(id);
    }

    public async Task Disable(int id)
    {
        var user = await _repo.GetById(id);
        if (user != null)
        {
            user.IsActive = false;
            await _repo.Save();
        }
    }

    public async Task<object> GetStats()
    {
        var total = await _repo.CountAll();
        var active = await _repo.CountActive();
        var pending = await _repo.CountPending();
        var courses = await _courseRepo.Count();

        return new
        {
            totalUsers = total,
            activeUsers = active,
            pendingUsers = pending,
            totalCourses = courses
        };
    }
}
