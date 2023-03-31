using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Contracts;

namespace ProyectoFinal.Services
{
    public class CRUDServices<TEntity> : ICRUDServices<TEntity>  where TEntity : class
    {
            private readonly DbContext _dbContext;

            public CRUDServices(PeliculasContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<TEntity> Create(TEntity entity)
            {
                _dbContext.Set<TEntity>().Add(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }

            public async Task<List<TEntity>> Read()
            {
                return await _dbContext.Set<TEntity>().ToListAsync();
            }

            public async Task<TEntity> Update(TEntity entity, int id)
            {
            TEntity? entityToUpdate = await _dbContext.Set<TEntity>().FindAsync(id);
                if (entityToUpdate == null)
            {
                    return null;
                }

                _dbContext.Entry(entityToUpdate).CurrentValues.SetValues(entity);
                await _dbContext.SaveChangesAsync();
                return entityToUpdate;
            }

            public async Task<TEntity> Delete(int id)
            {
                TEntity? entity = await _dbContext.Set<TEntity>().FindAsync(id);
                if (entity == null)
                {
                    return null;
                }

                _dbContext.Set<TEntity>().Remove(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
        }

    }

