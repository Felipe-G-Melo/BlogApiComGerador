using Blog.Api.Abstractions;

namespace Blog.Api.Domain.Posts.Entity;

public class PostEntity : BaseEntity<PostEntity>
{
    public string Title { get; init; } = string.Empty;
    public string Content { get; init; } = string.Empty;
}
