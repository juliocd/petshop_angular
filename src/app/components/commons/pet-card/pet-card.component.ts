import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PetDetailsComponent } from '../../pet-details/pet-details.component';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {
  constructor(public dialog: MatDialog) {}

  openPetDetailsDialog() {
    this.dialog.open(PetDetailsComponent);
  }
}
