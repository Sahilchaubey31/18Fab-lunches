using ECommerceAPI.Models;

namespace ECommerceAPI.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
        Task<Product?> UpdateProductAsync(Product product);
        Task<bool> DeleteProductAsync(int id);
    }

    public class ProductService : IProductService
    {
        private static List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Description = "High-performance laptop", Price = 999.99m, Stock = 10, ImageUrl = "https://via.placeholder.com/250x200" },
            new Product { Id = 2, Name = "Smartphone", Description = "Latest smartphone", Price = 699.99m, Stock = 15, ImageUrl = "https://via.placeholder.com/250x200" },
            new Product { Id = 3, Name = "Headphones", Description = "Wireless headphones", Price = 199.99m, Stock = 20, ImageUrl = "https://via.placeholder.com/250x200" },
            new Product { Id = 4, Name = "Tablet", Description = "10-inch tablet", Price = 399.99m, Stock = 8, ImageUrl = "https://via.placeholder.com/250x200" }
        };

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await Task.FromResult(_products);
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await Task.FromResult(_products.FirstOrDefault(p => p.Id == id));
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            product.Id = _products.Max(p => p.Id) + 1;
            _products.Add(product);
            return await Task.FromResult(product);
        }

        public async Task<Product?> UpdateProductAsync(Product product)
        {
            var existingProduct = _products.FirstOrDefault(p => p.Id == product.Id);
            if (existingProduct == null)
                return null;

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Stock = product.Stock;
            existingProduct.ImageUrl = product.ImageUrl;

            return await Task.FromResult(existingProduct);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return false;

            _products.Remove(product);
            return await Task.FromResult(true);
        }
    }
}