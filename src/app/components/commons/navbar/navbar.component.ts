import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public items = {
    home: 'Home',
    pets: 'Pets',
    toysAccessories: 'Toys and Accessories',
    bookAppointment: 'Book an Appointment',
    contactUs: 'Contact Us'
  }
  showModal: string = 'invisible';

  showModalMenu() {
    this.showModal = 'visible';
  }

  hideModalMenu() {
    this.showModal = 'invisible';
  }
}
