import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { isValidEmail } from 'src/app/helpers/utils';
import { ISubscriber } from 'src/app/models/ISubscriber';
import { SubscriberService } from 'src/app/services/SubscriberService';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  saveUnsuccessful:boolean = false;
  name: any;
  email: any;
  errorMessage: string = '';
  saveComplete:boolean = false;

  constructor(
    public subscriberService: SubscriberService
  ) {}

  onFormSubmit(ngForm: NgForm) {
    this.saveUnsuccessful = false;

    if (!ngForm.valid) {
      this.saveUnsuccessful = true;
      return;
    }

    if (!this.name) {
      alert("Name is required");
      return;
    }

    if (!this.email) {
      alert("Email is required");
      return;
    }

    if (!isValidEmail(this.email)) {
      alert("Email is ivalid");
      return;
    }

    const subscriber:ISubscriber = {
      name: this.name,
      email: this.email
    }

    this.subscriberService.saveSubscriber(subscriber).subscribe(data => {

      if (data.error) {
        this.saveUnsuccessful = true;
        this.errorMessage = data.error;
        console.error("Error saving subscriber", data.error);
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
      this.errorMessage = 'Saving subscriber failed. Try larer.';
      console.error("Error saving subscriber", error);
    })
  }
}
