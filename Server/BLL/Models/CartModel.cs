using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class CartModel
    {
       public List<ProductModel> ProductsCart { get; set; }

        public string CustomerId { set; get; }
    }
}
