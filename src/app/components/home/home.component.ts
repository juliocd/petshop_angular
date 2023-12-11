import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PetDetailsComponent } from '../pet-details/pet-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  showPetDetails(petId: number) {
    this.dialog.open(PetDetailsComponent, {
      data: {
        petId
      }
    });
  }
}
