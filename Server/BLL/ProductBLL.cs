using Microsoft.Extensions.Options;
using BLL.Models;

namespace BLL
{
    public class ProductBLL
    {
        private readonly List<ProductModel> _product;

        public ProductBLL(IOptions<List<ProductModel>> product)
        {
            _product = product.Value;

        }

        public List<ProductModel> GetAllProducts() { 
            return _product;
        }
    }
}
