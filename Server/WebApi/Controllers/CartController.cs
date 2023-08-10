using BLL.Models;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {


        private readonly CartBLL _CartBLL;

        public CartController(CartBLL cart)
        {
            _CartBLL = cart;
        }

        [HttpGet("{customerId}")]
        public IActionResult Get(string customerId)
        {
            return Ok(_CartBLL.GetCart(customerId));
        }

        [HttpDelete]
        public IActionResult Delete(string customerId,string makat)
        {
            _CartBLL.RemoveFromCart(customerId, makat);
            return Ok();
        }

        [HttpPost]
        public IActionResult Add(string customerId, ProductModel productCart)
        {
            _CartBLL.AddToCart(customerId, productCart);
            return Ok();
        }
    }
}
