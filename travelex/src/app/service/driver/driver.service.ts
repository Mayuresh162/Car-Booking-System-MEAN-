import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get(`${environment.apiBaseUrl}/drivers`);
  }

  getDriverByLanguage(language) {
    return this.http.get(`${environment.apiBaseUrl}/driver?lang=${language}`);
  }
  // setSelectedDriver(selectedDriver) {
  //   localStorage.setItem('driver', selectedDriver);
  // }

  // getSelectedDriver() {
  //   return localStorage.getItem('driver');
  // }

  // deleteSelectedDriver() {
  //   localStorage.removeItem('driver');
  // }
}

export class Driver {
  name: string;
  price: number;
  language: string;
  fare: number;
}
