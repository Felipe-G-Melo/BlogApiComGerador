namespace Blog.Api.Abstractions;

public interface IRepository<TEntity> where TEntity : BaseEntity<TEntity>
{
    Task<bool> Add(TEntity entity);
    Task<bool> Update(TEntity entity);
    Task<bool> Delete(Guid id);
    Task<TEntity?> GetById(Guid id);
    Task<ICollection<TEntity>> GetAll();
}
