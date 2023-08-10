import { Component } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { CartService } from '../cart/service/cart.service';
import { SearchService } from '../service/search.service';
import { IProduct } from '../models/IProduct.interface';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  products!: IProduct[];
  subCart!:Subscription;
  customerId!: string;
  constructor(
    private searchService: SearchService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subCart = this.cartService.cart$.subscribe((s) => {
      if (s) {
        this.customerId = s.CustomerId;
      }
    });

    this.searchValueChange("");
  }

  searchValueChange(search:string){
    forkJoin({
      product: search
        ? this.searchService.searchProduct(search.toString())
        : this.searchService.getAllProduct(),
      cart: this.cartService.getProductInCart(this.customerId),
    }).subscribe(({ product, cart }) => {
      console.log(product, cart);
      this.products = product.map((item) => {
        const item2 = cart.find((i2) => i2.sku === item.sku);
        return item2 ? { ...item, ...item2 } : item;
      });
    });
  }

  ngOnDestroy(): void {
    this.subCart.unsubscribe();
  }

}
