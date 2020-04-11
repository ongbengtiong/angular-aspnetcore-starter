using DSO.DotnetCore.Domain.Core.Interfaces.Repositories;
using System.Collections.Generic;

namespace DSO.DotnetCore.Domain.Repositories
{
    public abstract class BaseRepository<T> : IRepository<T>
    {
        private readonly DataContext _dataContext;

        public BaseRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(T entity)
        {
            _dataContext.Add(entity);
        }

        public bool SaveChanges()
        {
            return _dataContext.SaveChanges() > 0;
        }

        public abstract T Get(int id);

        public abstract IEnumerable<T> GetAll();
    }
}