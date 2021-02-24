import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.inteceptor';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './booking/booking.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HeaderComponent } from './header/header.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DatePipe } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { TicketComponent } from './ticket/ticket.component';

import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookingComponent,
    HeaderComponent,
    DriverListComponent,
    PaymentComponent,
    ConfirmBookingComponent,
    StripeCheckoutComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    GooglePlaceModule,
    NgxStripeModule.forRoot(environment.PUB_KEY)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, DatePipe],
  entryComponents: [
    ConfirmBookingComponent,
    StripeCheckoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
