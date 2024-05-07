import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchandiseCategory } from 'src/app/enums/MerchandiseCategory';
import { PetCategory } from 'src/app/enums/PetCategory';
import { IMerchandiseItem } from 'src/app/models/IMerchandiseItem';
import { MerchandiseService } from 'src/app/services/MerchandiseService';

@Component({
  selector: 'app-toys-and-accessories',
  templateUrl: './toys-and-accessories.component.html',
  styleUrls: ['./toys-and-accessories.component.css']
})
export class ToysAndAccessoriesComponent {
  merchandiseItemList: IMerchandiseItem[] = [];
  currentPetFilter: PetCategory | null = null;
  filterByDog = PetCategory.Dog;
  filterByCat = PetCategory.Cat;
  filterByBird = PetCategory.Bird;
  filterByReptile = PetCategory.Reptile;
  filterByFish = PetCategory.Fish;
  currentMerchandiseFilter: MerchandiseCategory | null = null;
  filterByToy = MerchandiseCategory.Toy;
  filterByAccessory = MerchandiseCategory.Accessories;
  textSearch: string = '';
  showFilter:boolean = false;

  constructor(
    public merchandiseService: MerchandiseService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMerchandise();

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.textSearch = params.get("search") || '';
        this.searchByText();
      }
    });
  }

  filterBy(petCategory?: PetCategory, merchandiseCategory?: MerchandiseCategory) {
    this.showFilter = false;
    
    if (!petCategory && !merchandiseCategory) {
      this.currentPetFilter = null;
      this.currentMerchandiseFilter = null;

      this.getMerchandise();
      this.textSearch = '';
      return;
    }
    
    this.merchandiseService.getMerchandise({
      ...(petCategory && {petCategory: petCategory}),
      ...(merchandiseCategory && {category: merchandiseCategory}),
    }).subscribe(data => {
      this.currentPetFilter = petCategory || null;
      this.currentMerchandiseFilter = merchandiseCategory || null;

      this.merchandiseItemList = data;
    });
  }

  getMerchandise() {
    this.merchandiseService.getMerchandise().subscribe(data => {
      this.merchandiseItemList = data;
    });
  }

  searchByText() {
    this.merchandiseService.getMerchandise({
      name: this.textSearch,
      ...(this.currentPetFilter && {petCategory: this.currentPetFilter}),
      ...(this.currentMerchandiseFilter && {category: this.currentMerchandiseFilter}),
    }).subscribe(data => {
      this.merchandiseItemList = data;
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}
