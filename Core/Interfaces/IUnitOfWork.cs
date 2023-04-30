using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ILikesRepository LikesRepository { get; }
        IMessageRepository MessageRepository { get; }
        IFollowRepository FollowRepository { get; }
        IJobsRepository JobsRepository { get; }
        IProductsRepository ProductsRepository { get; }
        IServicesRepository ServicesRepository { get; }
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        Task<int> Complete();
        bool HasChanges();
    }
}