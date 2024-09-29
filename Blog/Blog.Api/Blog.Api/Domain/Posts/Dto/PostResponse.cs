using Blog.Api.Domain.Posts.Entity;

namespace Blog.Api.Domain.Posts.Dto;

public class PostResponse
{
    public Guid? Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Content { get; init; } = string.Empty;

    public static PostResponse ToResponse(PostEntity post)
        => new()
        {
            Id = post.Id,
            Title = post.Title,
            Content = post.Content
        };
}
