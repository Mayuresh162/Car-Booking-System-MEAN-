import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { StripeService, Elements, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
import { PaymentService } from '../service/payment/payment.service';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements OnInit {
  @ViewChild('regForm') regForm: NgForm;

  paymentDetails = {
    fullName: '',
    amount: 0,
  };

  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;

  elementsOptions: ElementsOptions = {
    locale: 'en',
  };


  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService,
    private payService: PaymentService) {
      this.paymentDetails.amount = data.amount;
  }


  ngOnInit() {
    this.loading = false;

    this.stripeService.elements(this.elementsOptions)
    .subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          iconStyle: 'solid',
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          },
        });
        this.card.mount('#card-element');
      }
    });
  }

  createStripeToken() {
    this.submitted = true;
    this.loading = true;
    this.stripeData = this.paymentDetails;
    this.stripeService.createToken(this.card, { name })
    .subscribe(result => {
      if (result.token) {
        this.stripeData['token'] = result.token;
        this.payService.checkout(this.stripeData)
        .subscribe(res => {
          if (res['success']) {
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = res['status'];
            this.dialogRef.close(this.paymentStatus);
          } else {
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = res['status'];
            this.dialogRef.close(this.paymentStatus);
          }
        });
      } else if (result.error) {
        this.paymentStatus = result.error.message;
        this.dialogRef.close(this.paymentStatus);
      }
    });
  }

}
