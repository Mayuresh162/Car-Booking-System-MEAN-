import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingService } from '../service/booking/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('booking') bookingForm: NgForm;

  selectedType;
  userDetails;
  startDate;
  endDate;
  noOfDays;
  booking = {
    source: '',
    destination: '',
    departDate: '',
    returnDate: '',
    tripType: '',
    distance: 0,
    userId: ''
  };
  formattedaddress = '';
  options = {
    componentRestrictions: {
      country: ['IND']
    }
  };

  pickup = {
    plat: '',
    plong: ''
  };

  destination = {
    dlat: '',
    dlong: ''
  };
  serverErrorMessage: string;

  constructor(public loginService: LoginService, public router: Router,
    public snackBar: MatSnackBar, public bookService: BookingService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => {}
      );
    }
  }

  pickupAddressChange(address: any) {
    // setting address from API to local variable
     this.formattedaddress = address.formatted_address;
     this.booking.source = this.formattedaddress;
     this.pickup = {
       plat: address.geometry.location.lat(),
       plong: address.geometry.location.lng()
     };
  }

  destAddressChange(address: any) {
    // setting address from API to local variable
     this.formattedaddress = address.formatted_address;
     this.booking.destination = this.formattedaddress;
     this.destination = {
        dlat: address.geometry.location.lat(),
        dlong: address.geometry.location.lng()
     };
  }

  onSubmit() {
    this.booking.tripType = this.selectedType;
    this.booking.distance = this.calculateDistance();
    if (this.selectedType === 'ROUND_TRIP') {
      this.calculateDays();
    }
    this.booking.userId = this.userDetails.userId;
    const queryParams = {
      distance: this.booking.distance,
      triptype: this.booking.tripType,
      travelDays: this.noOfDays
    };
    this.bookService.bookride(this.booking)
      .subscribe(res => {
        const response: any = res;
        console.log(response);
        this.router.navigate(['/drivers'], {
          queryParams: queryParams
        });
      }, err => {
        this.serverErrorMessage = err.error.message;
        this.showMessage(this.serverErrorMessage);
      });
    this.resetForm();
  }

  showMessage(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  resetForm() {
    this.booking = {
      source: '',
      destination: '',
      departDate: '',
      returnDate: '',
      tripType: '',
      distance: 0,
      userId: ''
    };
    this.bookingForm.resetForm();
    this.serverErrorMessage = '';
  }

  startDateChanged(startDate) {
    this.startDate = startDate;
    this.booking.departDate = this.datePipe.transform(startDate, 'dd/MM/yyyy');
  }

  endDateChanged(endDate) {
    this.endDate = endDate;
    this.booking.returnDate = this.datePipe.transform(endDate, 'dd/MM/yyyy');
  }

  calculateDistance() {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad((+this.destination.dlat) - (+this.pickup.plat));
    const dLon = this.deg2rad((+this.destination.dlong) - (+this.pickup.plong));
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(+this.pickup.plat)) * Math.cos(this.deg2rad(+this.destination.dlat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  calculateDays() {
    const sDate = new Date(this.startDate);
    const eDate = new Date(this.endDate);

    this.noOfDays = Math.floor((eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24);
    console.log(this.noOfDays);
  }
}
