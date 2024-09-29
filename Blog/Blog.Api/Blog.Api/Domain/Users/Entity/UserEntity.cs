using Blog.Api.Abstractions;

namespace Blog.Api.Domain.Users.Entity;

public class UserEntity : BaseEntity<UserEntity>
{
    public string Username { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}
