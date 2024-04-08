import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PetCategory } from "../enums/PetCategory";
import { MerchandiseCategory } from "../enums/MerchandiseCategory";
import getHost from "../helpers/settings";

@Injectable({
    providedIn: 'root'
})
export class MerchandiseService {
    host = getHost();
    constructor(public httpClient: HttpClient){}

    getMerchandise(filter?: {
      category?: MerchandiseCategory,
      name?: string,
      petCategory?: PetCategory
    }) {
      const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
        };

        let queryArr = [];
        if (filter) {
          if (filter.category) {
            queryArr.push('category=' + filter.category)
          }
          if (filter.name) {
            queryArr.push('name=' + filter.name)
          }
          if (filter.petCategory) {
            queryArr.push('petCategory=' + filter.petCategory)
          }
        }
    
      return this.httpClient.get<any>(`${this.host}/merchandise${queryArr ? '?' + queryArr.join('&') : ''}`, options);
    }
}