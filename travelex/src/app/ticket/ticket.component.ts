import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../service/booking/booking.service';
import { LoginService } from '../service/login/login.service';
import { PaymentService } from '../service/payment/payment.service';
import { TicketService } from '../service/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticket = {
    source: '',
    destination: '',
    pickupAddress: '',
    pickupTime: '',
    departDate: '',
    returnDate: '',
    tripType: '',
    driverName: '',
    fare: 0,
    userId: ''
  };

  bookingDetails;
  paymentDetails;
  userDetails;
  constructor(
    public bookService: BookingService,
    public payService: PaymentService,
    public ticketService: TicketService,
    public router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
          this.getTicketDetails(this.userDetails);
        },
        err => {}
      );
    }
  }

  getTicketDetails(userDetails) {
    console.log(userDetails);
    this.bookService.getBookingDetails(userDetails.userId)
    .subscribe(res => {
      if (res) {
        this.bookingDetails = res;
      }
      this.payService.getPayment(userDetails.userId)
      .subscribe(resp => {
        if (resp) {
          this.paymentDetails = resp;
          this.showTicket();
        }
      });
    });
  }

  showTicket() {
    this.ticket.source = this.bookingDetails.source;
    this.ticket.destination = this.bookingDetails.destination;
    this.ticket.departDate = this.bookingDetails.departDate;
    this.ticket.returnDate = this.bookingDetails.returnDate;
    this.ticket.tripType = this.bookingDetails.triptype;
    this.ticket.pickupAddress = this.paymentDetails.pickupAddress;
    this.ticket.pickupTime = this.paymentDetails.pickupTime;
    this.ticket.driverName = this.paymentDetails.driverName;
    this.ticket.fare = this.paymentDetails.fare;
    this.ticket.userId = this.userDetails.userId;
  }

  done() {
    this.ticketService.setTicket(this.ticket)
    .subscribe(res => {
      this.router.navigate(['/booking']);
    });
  }
}
