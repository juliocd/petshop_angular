import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ISubscriber } from "../models/ISubscriber";
import getHost from "../helpers/settings";

@Injectable({
    providedIn: 'root'
})
export class SubscriberService {
    host = getHost();

    constructor(public httpClient: HttpClient){}

    saveSubscriber(subscriber: ISubscriber) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}/subscribers`, subscriber, options);
    }
}