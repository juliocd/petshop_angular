import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ToysAndAccessoriesComponent } from './components/toys-and-accessories/toys-and-accessories.component';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { PetCardComponent } from './components/commons/pet-card/pet-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    ContactUsComponent,
    ToysAndAccessoriesComponent,
    HomeComponent,
    PetsComponent,
    NavbarComponent,
    PetCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
