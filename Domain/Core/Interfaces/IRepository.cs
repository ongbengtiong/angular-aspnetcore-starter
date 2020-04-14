using System;
using System.Collections.Generic;
using System.Text;

namespace DSO.DotnetCore.Domain.Core.Interfaces.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll(string sort);

        T Get(int id);

        void Add(T entity);
        bool SaveChanges();
    }
}
