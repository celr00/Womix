using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IPdfService
    {
        Task<ImageUploadResult> AddPdf(IFormFile file);
        Task<DeletionResult> DeletePdf(string pdfId);
    }
}