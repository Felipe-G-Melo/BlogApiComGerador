using Blog.Api.Abstractions;
using Blog.Api.Domain.Posts.Entity;

namespace Blog.Api.Domain.Posts.Repository;

public class PostRepository
    : Repository<PostEntity>, IPostRepository
{
}
