using Blog.Api.Domain.Posts.Entity;

namespace Blog.Api.Domain.Posts.Dto;

public class PostRequest
{
    public string Title { get; init; } = string.Empty;
    public string Content { get; init; } = string.Empty;

    public PostEntity ToEntity(Guid? id = null)
        => new()
        {
            Id = id ?? Guid.NewGuid(),
            Title = Title,
            Content = Content
        };
}
