import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingDetails;
  constructor(private http: HttpClient) { }

  bookride(bookingDetails) {
    return this.http.post(`${environment.apiBaseUrl}/bookride`, bookingDetails);
  }

  setbooking(bookingData) {
    this.bookingDetails = bookingData;
  }

  getBooking() {
    return this.bookingDetails;
  }

  // deleteBooking() {
  //   localStorage.removeItem('booking');
  // }

  getBookingDetails(userId) {
    return this.http.get(`${environment.apiBaseUrl}/getBooking?id=${userId}`);
  }
}
