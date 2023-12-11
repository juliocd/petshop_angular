import { Component } from '@angular/core';
import { PetCategory } from 'src/app/enums/PetCategory';
import { IPet } from 'src/app/models/IPet';
import { PetService } from 'src/app/services/Pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent {
  pets:IPet[] = [];
  filterByDog = PetCategory.Dog;
  filterByCat = PetCategory.Cat;
  filterByBird = PetCategory.Bird;
  filterByReptile = PetCategory.Reptile;
  filterByFish = PetCategory.Fish;
  currentFilter: PetCategory | null = null;
  textSearch:string = '';

  constructor(
    public petService: PetService
  ) {}

  ngOnInit() {
    this.getAllPets();
  }

  filterBy(petCategory?: PetCategory) {
    if (!petCategory) {
      this.currentFilter = null;

      this.getAllPets();
      this.textSearch = '';
      return;
    }
    
    this.petService.getPets({
      category: petCategory
    }).subscribe(data => {
      this.currentFilter = petCategory;
      this.pets = data;
    });
  }

  getAllPets() {
    this.petService.getPets().subscribe(data => {
      this.pets = data;
    });
  }

  searchByText() {
    this.petService.getPets({
      breed: this.textSearch,
      ...(this.currentFilter && {category: this.currentFilter})
    }).subscribe(data => {
      this.pets = data;
    });
  }
}
