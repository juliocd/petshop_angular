import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { ToysAndAccessoriesComponent } from './components/toys-and-accessories/toys-and-accessories.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'toys-accessories', component: ToysAndAccessoriesComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'pet-details/:id', component: PetDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
