import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { IProduct } from '../models/IProduct.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {

  constructor(private cartService:CartService){
  }


  products!:IProduct[]|undefined;
  productsArr:IProduct[] = [];
  sub!:Subscription;
  sum!:number;

  ngOnInit(): void {
  this.sub = this.cartService.cart$.subscribe(s=>{
    if(s){
      this.products = s.ProductsCart;
      this.productsArr = this.products;
      this.sum = this.products.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.count?currentValue.count *+currentValue.price:0)
      },0);
    }
    });
  }

  searchValueChange(search:string){
    if(this.products){
      this.productsArr = this.products.filter(s=>s.sku.includes(search)|| s.name.includes(search));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
