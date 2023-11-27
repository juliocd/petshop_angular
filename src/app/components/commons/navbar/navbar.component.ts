import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public items = {
    home: 'Home',
    petsAvailable: 'Pets Availabe',
    toysAccessories: 'Toys and Accessories',
    bookAppointment: 'Book an Appointment',
    contactUs: 'Contaact Us'
  }
}
