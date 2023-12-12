import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ToysAndAccessoriesComponent } from './components/toys-and-accessories/toys-and-accessories.component';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { PetCardComponent } from './components/commons/pet-card/pet-card.component';
import { ItemCardComponent } from './components/commons/item-card/item-card.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PetRecommendationsComponent } from './components/commons/pet-recommendations/pet-recommendations.component';

import {MatDialogModule} from '@angular/material/dialog';
import { PetService } from './services/Pet.service';
import { ErrorAlertComponent } from './components/commons/error-alert/error-alert.component';
import { SuccessAlertComponent } from './components/commons/success-alert/success-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    ContactUsComponent,
    ToysAndAccessoriesComponent,
    HomeComponent,
    PetsComponent,
    NavbarComponent,
    PetCardComponent,
    ItemCardComponent,
    PetRecommendationsComponent,
    ErrorAlertComponent,
    SuccessAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
