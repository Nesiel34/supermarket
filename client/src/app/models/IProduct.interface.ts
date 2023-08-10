export interface IProduct {
  baseProductImage: string
  name: string
  manufacturer: string
  unitDescription: string
  price: string
  unit: string
  sku: string
  count?:number
}

// export interface IProductCart extends IProduct{
//   count:number;
// }
