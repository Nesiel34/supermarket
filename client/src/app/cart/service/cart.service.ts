import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart } from 'src/app/models/ICart.interface';
import { IProduct } from 'src/app/models/IProduct.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

    private cart:BehaviorSubject<ICart|null> = new BehaviorSubject<ICart|null>(null);

  get cart$(){
   return this.cart.asObservable();
  }

  setCart$(cartObj:ICart){
    this.cart.next(cartObj);
  }

  getProductInCart(customerID:string){
    const url =`${environment.baseUrl}Cart/${customerID}`
    return this.httpClient.get<IProduct[]>(url);
  }

  addProductInCart(customerID:string,productCart:IProduct){
    const url =`${environment.baseUrl}Cart/?customerId=${customerID}`
    return this.httpClient.post<void>(url,productCart);
  }

  removeProductFromCart(customerID:string,sku:string){
    const url =`${environment.baseUrl}Cart/?customerId=${customerID}&makat=${sku}`
    return this.httpClient.delete<void>(url);
  }

}
