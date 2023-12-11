import { Component } from '@angular/core';
import * as moment from 'moment';
import { momentToDate } from 'src/app/helpers/utils';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  startDate = moment().day() == 0 ? momentToDate(moment().add(1, 'day')) : momentToDate(moment());

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && moment(d).isAfter(moment());
  };
}
