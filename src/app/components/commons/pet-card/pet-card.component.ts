import { Component, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PetDetailsComponent } from '../../pet-details/pet-details.component';
import { IPet } from 'src/app/models/IPet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {
  @Input() data:IPet;

  constructor(
    public router: Router,
    public dialog: MatDialog
  ) {}

  openPetDetailsDialog(petId: number) {
    this.dialog.open(PetDetailsComponent, {
      autoFocus: false,
      data: {
        petId
      }
    });
  }

  onBookAppointment(petId: number) {
    this.router.navigateByUrl("/book-appointment?petId=" + petId);
  }
}
