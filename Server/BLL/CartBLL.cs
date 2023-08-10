using BLL.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CartBLL
    {
        private List<CartModel> _cart;

        public CartBLL()
        {
            _cart = new List<CartModel>();
        }

        public void AddToCart(string customerId, ProductModel productCart)
        {
            CartModel cartModel = _cart.Find(obj => obj.CustomerId == customerId);
            if (cartModel!=null)
            {
                ProductModel productCartExits = cartModel.ProductsCart.Find(s => s.sku == productCart.sku);
                if(productCartExits != null)
                {
                    cartModel.ProductsCart.Find(s => s.sku == productCart.sku).count = productCart.count;
                }
                else
                {
                    cartModel.ProductsCart.Add(productCart);
                }
            }
            else
            {
                CartModel cartModelAdd = new CartModel
                {
                    CustomerId = customerId,
                    ProductsCart = new List<ProductModel> { productCart }
                };
                _cart.Add(cartModelAdd);
            }
        }

        public void RemoveFromCart(string customerId, string sku)
        {
            CartModel cartModel = _cart.Find(obj => obj.CustomerId == customerId);
            if (cartModel != null)
            {
                cartModel.ProductsCart = cartModel.ProductsCart.Where(s => s.sku != sku).ToList();
            }
        }

        public List<ProductModel> GetCart(string customerId)
        {
            CartModel cartOfCustomer = _cart.Find(obj => obj.CustomerId == customerId);
            if(cartOfCustomer != null)
            {
                return cartOfCustomer.ProductsCart;
            }
            else
            {
                return new List<ProductModel>();
            }
        }
    }
}
