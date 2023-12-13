import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/app/models/IAppointment';
import { AppointmentService } from 'src/app/services/AppointmentService';
import { PetService } from 'src/app/services/Pet.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  phoneNumber:number;
  appointments:IAppointment[] = [];
  appointmentId: number;

  constructor(
    public appointmentService: AppointmentService,
    public petService: PetService,
    public router: Router
  ) {}

  searchAppointments() {
    if(!this.phoneNumber) {
      alert("Enter a phone number");
      return;
    }

    if(this.phoneNumber < 1000000000 || this.phoneNumber > 99999999999) {
      alert("Invalid Phone number");
      return;
    }

    this.appointmentService.getAppointments(this.phoneNumber)
    .subscribe(data => {
      this.appointments = data;
    });
  }

  editAppointment(appointmentId: number) {
    this.router.navigateByUrl("/book-appointment?id=" + appointmentId);
  }
}
