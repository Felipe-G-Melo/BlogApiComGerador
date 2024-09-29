namespace Blog.Api.Abstractions;

public abstract class BaseEntity<T> where T : class
{
    public Guid Id { get; init; }
}
