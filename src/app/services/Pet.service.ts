import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortBy } from "../enums/SortBy";
import { PetCategory } from "../enums/PetCategory";

@Injectable({
    providedIn: 'root'
})
export class PetService {
    host = "http://localhost:3005";

    constructor(public httpClient: HttpClient){}

    getPet(petId: number) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.get<any>(`${this.host}/pets/${petId}`, options);
    }

    getPets(filter?: {
      category?: PetCategory,
      breed?: string,
      sortBy?: SortBy
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
          if (filter.breed) {
            queryArr.push('breed=' + filter.breed)
          }
        }
    
      return this.httpClient.get<any>(`${this.host}/pets${queryArr ? '?' + queryArr.join('&') : ''}`, options);
    }
}