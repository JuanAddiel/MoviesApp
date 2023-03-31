﻿namespace ProyectoFinal.Contracts
{
    public interface ICRUDServices <TEntity> where TEntity : class
    {
        Task<TEntity> Create(TEntity entity);
        Task<List<TEntity>> Read();
        Task<TEntity> Update(TEntity entity, int id);
        Task<TEntity> Delete(int id);
    }
}
