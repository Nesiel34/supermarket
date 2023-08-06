using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using BLL;
using BLL.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private ProductBLL _ProductBLL;

        public ProductsController(IOptions<List<ProductModel>> product)
        {
            _ProductBLL = new ProductBLL(product);
        }

        public IActionResult Get()
        {
            return Ok(_ProductBLL.GetAllProducts());
        }
    }
}