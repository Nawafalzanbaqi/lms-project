namespace LMS.Domain;

public class Course
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public required string YoutubeUrl { get; set; }
}
