import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../models/IProduct.interface';
import { FormControl } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { CartService } from '../cart/service/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../models/ICart.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit,OnDestroy {
  subCart!: Subscription;
  customerId!: string;

  constructor(private cdr: ChangeDetectorRef,private cartService:CartService){}



  @Input() product!:IProduct;
  @Input() cart:boolean =false;
  public unit!:FormControl;
  @ViewChild('tooltip') tooltip!: MatTooltip;


  ngOnInit(): void {
    this.subCart = this.cartService.cart$.subscribe((s) => {
      if (s) {
        this.customerId = s.CustomerId;
      }
    });
    this.unit = new FormControl(this.product.count?this.product.count:1);
  }

  ngAfterViewInit(): void {
    this.tooltip.disabled = true;
    this.cdr.detectChanges();

  }

  add(){
    this.unit.setValue(this.unit.value+1);
  }

  minus(){
    if((this.unit.value==0 && this.product.count) || (this.unit.value==1 && !this.product.count)){
      this.tooltip.disabled = false;
      this.tooltip.show();
      setTimeout(() => {
        this.tooltip.disabled = true;
      }, 1000);
      return;

    }
    this.unit.setValue(this.unit.value-1);
  }

  updateCartWS(){
    this.product.count = this.unit.value;
    if(this.unit.value==0){
      this.cartService.removeProductFromCart(this.customerId,this.product.sku).subscribe(()=>{
        this.unit.setValue(1);
        this.upateCart();

      });
    }
    else {
      this.cartService.addProductInCart(this.customerId,this.product).subscribe(()=>{
        this.upateCart();
      });
    }
  }

  removeFromCart(){
    this.cartService.removeProductFromCart(this.customerId,this.product.sku).subscribe(()=>{
      this.upateCart();
    });
  }

  upateCart(){
    this.cartService.getProductInCart(this.customerId).subscribe(s=>{
      const cart:ICart = {
        CustomerId:this.customerId,
        ProductsCart:s
      }
      this.cartService.setCart$(cart);
    });
  }

  ngOnDestroy(): void {
    this.subCart.unsubscribe();
  }

}
