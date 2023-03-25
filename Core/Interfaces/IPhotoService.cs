using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhoto(IFormFile file);
        Task<DeletionResult> DeletePhoto(string photoId);

        // Account photo
        Task<ImageUploadResult> AddAccountPhoto(IFormFile file);
    }
}