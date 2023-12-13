import { Component, Input } from '@angular/core';
import { IMerchandiseItem } from 'src/app/models/IMerchandiseItem';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input() data:IMerchandiseItem;
  
  constructor(public cartService: CartService) {}

  removeItem(item: IMerchandiseItem) {
    this.cartService.removeItem(item);
  }

  addItem(item: IMerchandiseItem) {
    this.cartService.addItem(item);
  }
}
