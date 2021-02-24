import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentDetails;
  constructor(private http: HttpClient) { }

  setPayment(paymentData) {
    this.paymentDetails = paymentData;
  }

  getPaymentData() {
    return this.paymentDetails;
  }

  // deletePayment() {
  //   localStorage.removeItem('payment');
  // }

  checkout(paymentData) {
    return this.http.post(`${environment.apiBaseUrl}/checkout`, paymentData);
  }

  storePayment(paymentData) {
    return this.http.post(`${environment.apiBaseUrl}/payment`, paymentData);
  }

  getPayment(userId) {
    return this.http.get(`${environment.apiBaseUrl}/getPayment?id=${userId}`);
  }
}
