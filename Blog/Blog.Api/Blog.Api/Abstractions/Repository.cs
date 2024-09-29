namespace Blog.Api.Abstractions;

public abstract class Repository<TEntity> 
    : IRepository<TEntity> 
    where TEntity : BaseEntity<TEntity>
{
    private ICollection<TEntity> _entities = [];
    public async Task<bool> Add(TEntity entity)
    {
        return await Task.Run(() =>
        {
            _entities.Add(entity);
            return true;
        });
    }

    public async Task<bool> Delete(Guid id)
    {
        return await Task.Run(() =>
        {
            var entityToDelete = _entities.FirstOrDefault(e => e.Id == id);
            if (entityToDelete is null) return false;
            
            return  _entities.Remove(entityToDelete);
        });
    }

    public async Task<ICollection<TEntity>> GetAll()
    {
        return await Task.Run(() =>
        {
            return _entities;
        });
    }

    public async Task<TEntity?> GetById(Guid id)
    {
        return await Task.Run(() =>
        {
            return _entities.FirstOrDefault(e => e.Id == id);
        });
    }

    public async Task<bool> Update(TEntity entity)
    {
        return await Task.Run(() =>
        {
            var entityToUpdate = _entities.FirstOrDefault(e => e.Id == entity.Id);
            if (entityToUpdate is null) return false;

            _entities.Remove(entityToUpdate);
            _entities.Add(entity);
            return true;
        });
    }
}
