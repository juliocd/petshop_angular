import { Component } from '@angular/core';
import { CartService } from './services/CartService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petshop_angular';
  cartItems:number = 0;
  cartTotal:number = 0;

  constructor(public cartService: CartService) {}

  onCartUpdate() {
    this.cartItems = this.cartService.getTotalItems();
    this.cartTotal = this.cartService.getTotalPrice();
  }
}
