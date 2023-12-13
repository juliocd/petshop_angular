import { Injectable } from "@angular/core";
import { IMerchandiseItem } from "../models/IMerchandiseItem";

@Injectable({
    providedIn: 'root'
})
export class CartService {
  private cartItems: {
    [key: string]: number
  } = {};
  private totalCart:number = 0;

  removeItem(item: IMerchandiseItem) {
    const count = this.cartItems[item.id] || 0;
    if (count > 0) {
      this.cartItems[item.id] = count - 1;
      this.totalCart -= item.price;
    }
  }

  addItem(item: IMerchandiseItem) {
    const count = this.cartItems[item.id];
    this.cartItems[item.id] = (count || 0) + 1;
    this.totalCart += item.price;
  }

  getCountByItemId(itemId: number) {
    return this.cartItems[itemId] || 0;
  }

  getTotalPrice() {
    return this.totalCart;
  }

  getTotalItems() {
    const keys = Object.keys(this.cartItems);
    let totalCount = 0;

    for (let key of keys) {
      totalCount += this.cartItems[key];
    }
    return totalCount;
  }
}