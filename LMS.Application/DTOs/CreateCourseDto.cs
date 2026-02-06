namespace LMS.Application.DTOs;

public class CreateCourseDto
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string YoutubeUrl { get; set; }
}
