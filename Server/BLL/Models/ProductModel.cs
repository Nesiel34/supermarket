namespace BLL.Models
{
    public class ProductModel
    {
        public string baseProductImage { get; set; }
        public string name { get; set; }
        public string manufacturer { get; set; }
        public string unitDescription { get; set; }
        public string price { get; set; }
        public string unit { get; set; }
        public string sku { get; set; }
        public int? count { get; set; }
    }
}
