import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppointment } from "../models/IAppointment";
import getHost from "../helpers/settings";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    host = getHost();

    constructor(public httpClient: HttpClient){}

    saveAppointment(appointment: Partial<IAppointment>) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}/appointments`, appointment, options);
    }

    updateAppointment(id:number, appointment: Partial<IAppointment>) {
      const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
        };
    
      return this.httpClient.put<any>(`${this.host}/appointments/${id}`, appointment, options);
  }

    getAppointments(phoneNumber: number) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      };
  
      return this.httpClient.get<any>(`${this.host}/appointments?phoneNumber=${phoneNumber}`, options);
    }

    getAppointment(id: number) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      };
  
      return this.httpClient.get<any>(`${this.host}/appointments/${id}`, options);
    }

    deleteAppointment(id: number) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      };
  
      return this.httpClient.delete<any>(`${this.host}/appointments/${id}`, options);
    }
}