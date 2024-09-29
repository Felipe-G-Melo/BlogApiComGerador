using Blog.Api.Abstractions;
using Blog.Api.Domain.Users.Entity;

namespace Blog.Api.Domain.Users.Repository;

public class UserRepository
    : Repository<UserEntity>, IUserRepository
{
}
