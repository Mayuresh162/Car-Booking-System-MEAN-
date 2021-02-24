import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {
  onPositiveAction: EventEmitter<any> = new EventEmitter();
  onNegativeAction: EventEmitter<any> = new EventEmitter();

  title;
  driverName;
  driverLanguage;
  fare;
  driverFee = 250;
  positiveButtonText;
  negativeButtonText;
  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.calculateFare(data);
    }

  ngOnInit() {
  }

  calculateFare(travelData) {
    const triptype = travelData.bookingData.triptype;
    const driverPrice = travelData.selectedDriver.price;
    let travelDays = travelData.bookingData.noOfDays;
    let distance = Math.ceil(travelData.bookingData.distance);
    this.driverName = travelData.selectedDriver.name;
    this.driverLanguage = travelData.selectedDriver.language;

    if (triptype === 'ONE_WAY') {
      this.fare = distance * driverPrice;
    } else if (triptype === 'ROUND_TRIP') {
      if (travelDays == 0 || travelDays == 1) {
        travelDays = 1;
      }
      if ((2 * distance) < 300) {
        distance = 300;
      } else {
        distance = 2 * distance;
      }
      this.fare = (travelDays * driverPrice * distance) + this.driverFee;
    }
  }

  cancel() {
    this.dialogRef.close();
    if (this.onNegativeAction) {
      this.onNegativeAction.emit();
    }
  }

  actionConfirmed() {
    this.dialogRef.close();
    const payload = {
      driverName: this.driverName,
      driverLanguage: this.driverLanguage,
      fare: this.fare
    };
    if (this.onPositiveAction) {
      this.onPositiveAction.emit(payload);
    }
  }
}
