namespace LMS.Domain;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = "";
    public string PasswordHash { get; set; } = "";

    public string Role { get; set; } = "Trainee";

    public bool IsActive { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
