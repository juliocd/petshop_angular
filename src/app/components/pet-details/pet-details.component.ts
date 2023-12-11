import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent {
  constructor(
    public dialog: MatDialog,
    public router: Router
  ) {}

  onBookAppointment() {
    this.dialog.closeAll();
    this.router.navigateByUrl("/book-appointment");
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
