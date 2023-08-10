import { IProduct } from "./IProduct.interface";

export interface ICart {
  ProductsCart:IProduct[],
  CustomerId:string
}
