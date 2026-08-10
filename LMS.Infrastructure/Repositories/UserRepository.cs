using LMS.Application.Interfaces;
using LMS.Domain;
using LMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;

    public UserRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<User?> GetByUsername(string username)
    {
        return await _db.Users.FirstOrDefaultAsync(x => x.Username == username);
    }

    public async Task<User?> GetById(int id)
    {
        return await _db.Users.FindAsync(id);
    }

    public async Task Add(User user)
    {
        await _db.Users.AddAsync(user);
    }

    public async Task Save()
    {
        await _db.SaveChangesAsync();
    }

    public async Task<List<User>> GetPendingUsers()
    {
        return await _db.Users
            .Where(x => !x.IsActive && x.Role == "Trainee")
            .ToListAsync();
    }

    public async Task Activate(int id)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
            return;

        user.IsActive = true;

        await _db.SaveChangesAsync();
    }

    public async Task<int> CountAll()
    {
        return await _db.Users.CountAsync();
    }

    public async Task<int> CountActive()
    {
        return await _db.Users.CountAsync(u => u.IsActive);
    }

    public async Task<int> CountPending()
    {
        return await _db.Users.CountAsync(u => !u.IsActive && u.Role != "Admin");
    }
}
