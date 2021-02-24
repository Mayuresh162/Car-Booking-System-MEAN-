import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../service/payment/payment.service';
import { BookingService } from '../service/booking/booking.service';
import { DriverService } from '../service/driver/driver.service';
import { StripeCheckoutComponent } from '../stripe-checkout/stripe-checkout.component';
import { MatDialog } from '@angular/material';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm: NgForm;

  payment = {
    pickupAddress: '',
    pickupTime: '',
    fare: 0,
    driverName: '',
    driverLanguage: '',
    userId: ''
  };
  userDetails;

  constructor(public payService: PaymentService, public bookService: BookingService, public loginService: LoginService,
    public driverService: DriverService, public router: Router, private route: ActivatedRoute,
    public dialog: MatDialog ) {
      this.route.queryParams.subscribe(queryParams => {
        this.payment.fare = queryParams.fare;
        this.payment.driverLanguage = queryParams.driverLanguage;
        this.payment.driverName = queryParams.driverName;
      });
    }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
          this.payment.userId = this.userDetails.userId;
        },
        err => {}
      );
    }
  }

  shouldDisable() {
    return !this.payment.pickupAddress || !this.payment.pickupTime;
  }

  onSubmit() {
    const dialogReference = this.dialog.open(StripeCheckoutComponent, {
      data: {
        amount: this.payment.fare
      },
      disableClose: true
    });
    dialogReference.afterClosed()
    // waiting for stripe token that will be given back
    .subscribe(res => {
      console.log(res);
      if (res == 'Payment Succesful') {
        this.payService.storePayment(this.payment)
        .subscribe(paymentResp => {
          if (this.loginService.isLoggedIn()) {
            this.router.navigate(['/ticket']);
          } else {
            this.router.navigate(['/booking']);
          }
        });
      }
    });
  }
}
