import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { getPetCategoryName, getStates, momentToDate } from 'src/app/helpers/utils';
import { IAppointment } from 'src/app/models/IAppointment';
import { IPet } from 'src/app/models/IPet';
import { AppointmentService } from 'src/app/services/AppointmentService';
import { PetService } from 'src/app/services/Pet.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  startDate = moment().day() == 0 ? momentToDate(moment().add(1, 'day')) : momentToDate(moment());
  saveUnsuccessful: boolean = false;
  saveComplete: boolean = false;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  state: string;
  zipCode: number;
  appointmentDate: string;
  appointmentTime: string;
  petId: number;
  states: {
    state: string,
    key: string
  }[] = [];
  pets: {
    name: string,
    id: string
  }[] = [];
errorMessage: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public petService: PetService,
    public appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.populateStatesComboblox();
    this.populatePetsComboBox();

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.petId = parseInt(params.get("petId") || '');
      }
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && moment(d).isAfter(moment());
  };

  goHome() {
    this.router.navigateByUrl("/home");
  }

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;

    if (!ngForm.valid) {
      this.saveUnsuccessful = true;
      return;
    }

    if(!this.firstName) {
      alert("First name is required");
      return;
    }

    if(!this.lastName) {
      alert("Last name is required");
      return;
    }

    if(!this.phoneNumber) {
      alert("Phone number is required");
      return;
    }

    if(isNaN(this.phoneNumber) || this.phoneNumber < 1000000000 || this.phoneNumber > 99999999999) {
      alert("Invalid Phone number");
      return;
    }

    if(!this.address) {
      alert("Address is required");
      return;
    }

    if(!this.state) {
      alert("State is required");
      return;
    }

    if(!this.zipCode) {
      alert("Zip Code is required");
      return;
    }

    if(isNaN(this.zipCode) || this.zipCode < 10000 || this.zipCode > 99999) {
      alert("Invalid Zip Code");
      return;
    }

    if(!this.appointmentDate) {
      alert("Appointment Date is required");
      return;
    }

    if(!this.appointmentTime) {
      alert("Appointment Time is required");
      return;
    }

    if(!this.petId) {
      alert("You have to select a pet");
      return;
    }

    const appointment:IAppointment = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      state: this.state,
      zipCode: this.zipCode,
      appointmentDate: moment(this.appointmentDate).format('MM/DD/YYYY'),
      appointmentTime: this.appointmentTime,
      petId: this.petId
    }

    this.appointmentService.saveAppointment(appointment).subscribe(data => {

      if (data.error) {
        this.saveUnsuccessful = true;
        this.errorMessage = data.error;
        console.error("Error saving appointment", data.error);
        return;
      }

      this.saveUnsuccessful = false;
      this.saveComplete = true;

      setTimeout(() => {
        this.saveComplete = false;
      }, 2000)

      ngForm.reset();
    }, (error) => {
      this.saveUnsuccessful = true;
      this.errorMessage = 'Booking appointment failed. Try larer.';
      console.error("Error saving appointment", error);
    })
  }

  populateStatesComboblox() {
    const statesObj = getStates();
    const stateKeys = Object.keys(statesObj);

    for (let key of stateKeys) {
      this.states.push({
        state: statesObj[key],
        key: key
      })
    }
  }

  populatePetsComboBox() {
    this.petService.getPets().subscribe(data => {
      for(let pet of data) {
        this.pets.push({
          id: pet.id,
          name: `${pet.breed} (${getPetCategoryName(pet.category)})`
        })
      }
    });
  }
}
