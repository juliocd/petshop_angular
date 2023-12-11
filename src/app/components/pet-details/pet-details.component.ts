import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPet } from 'src/app/models/IPet';
import { PetService } from 'src/app/services/Pet.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getPetCategoryName } from 'src/app/helpers/utils';
import { PetCategory } from 'src/app/enums/PetCategory';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent {
  getPetCategory(petCategory: PetCategory) {
    return getPetCategoryName(petCategory);
  }
  petId: string;
  public pet:IPet;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public petService: PetService,
    @Inject(MAT_DIALOG_DATA) public data: {petId: number}
  ) {}

  ngOnInit() {
    this.petService.getPet(this.data.petId).subscribe(data => {
      this.pet = data;
    });
  }

  onBookAppointment(petId: number) {
    this.dialog.closeAll();
    this.router.navigateByUrl("/book-appointment?petId=" + petId);
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
