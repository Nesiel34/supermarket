import { Component } from '@angular/core';
import { CartService } from './cart/service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  badge: number = 0;
  showSearch: boolean = false;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.setCart$({
      CustomerId: new Date().getTime().toString(),
      ProductsCart: [],
    });
    this.cartService.cart$.subscribe((s) => {
      if (s) {
        this.badge = s?.ProductsCart.length;
      }
    });
    this.router.events.subscribe(() => {
      if (this.router.url == '/cart') {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    });
  }
}
