import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { getPetCategoryName, getStates, momentToDate } from 'src/app/helpers/utils';
import { IAppointment } from 'src/app/models/IAppointment';
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
  appointmentId: number;
  appointment: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public petService: PetService,
    public appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.populateStatesComboBox();
    this.populatePetsComboBox();

    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.petId = parseInt(params.get("petId") || '');
        this.appointmentId = parseInt(params.get("id") || '');

        if (this.appointmentId) {
          this.loadData();
        }
      }
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && moment(d).isAfter(moment());
  };

  goBack() {
    this.router.navigateByUrl(this.appointmentId ? '/appointmetns' : "/home");
  }

  viewAppointmes() {
    this.router.navigateByUrl("/appointments");
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

    if(this.phoneNumber < 1000000000 || this.phoneNumber > 99999999999) {
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

    if(this.zipCode < 10000 || this.zipCode > 99999) {
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

    const appointment:Partial<IAppointment> = {
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

    if (this.appointmentId) {
      this.appointmentService.updateAppointment(this.appointmentId, appointment).subscribe(data => {
        if (data.error) {
          this.saveUnsuccessful = true;
          this.errorMessage = data.error;
          console.error("Error updating appointment", data.error);
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
        this.errorMessage = 'Updating appointment failed. Try larer.';
        console.error("Error updating appointment", error);
      })

      return;
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

  populateStatesComboBox() {
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

  loadData() {
    this.appointmentService.getAppointment(this.appointmentId)
      .subscribe(data => {
        this.appointmentId = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.phoneNumber = data.phoneNumber,
        this.address = data.address,
        this.state = data.state,
        this.zipCode = data.zipCode,
        this.appointmentDate = data.appointmentDate,
        this.appointmentTime = data.appointmentTime,
        this.petId = data.petId
      });
  }
}

