using Blog.Api.Domain.Users.Entity;

namespace Blog.Api.Domain.Users.Dto;

public class UserResponse
{
    public Guid? Id { get; init; }
    public string Username { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;

    public static UserResponse ToResponse(UserEntity user)
        => new()
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Password = user.Password
        };
}
