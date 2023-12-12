import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppointment } from "../models/IAppointment";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    host = "http://localhost:3005";

    constructor(public httpClient: HttpClient){}

    saveAppointment(appointment: IAppointment) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}/appointments`, appointment, options);
    }
}