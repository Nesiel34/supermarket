import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/IProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient:HttpClient) { }

  getAllProduct(){
    const url =`${environment.baseUrl}Products`
    return this.httpClient.get<IProduct[]>(url);
  }

  searchProduct(str:string){
    const url =`${environment.baseUrl}Products/${str}`
    return this.httpClient.get<IProduct[]>(url);
  }
}
