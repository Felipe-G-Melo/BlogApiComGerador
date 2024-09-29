using Blog.Api.Domain.Users.Entity;

namespace Blog.Api.Domain.Users.Dto;

public class UserRequest
{
    public string Username { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;

    public UserEntity ToEntity(Guid? id = null)
        => new()
        {
            Id = id ?? Guid.NewGuid(),
            Username = Username,
            Email = Email,
            Password = Password
        };
}
