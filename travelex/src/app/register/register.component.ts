import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('regForm') regForm: NgForm;

  selectedUser = {
    fullName: '',
    email: '',
    password: ''
  };
  serverErrorMessage: string;

  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public loginService: LoginService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  shouldDisable() {
    return !this.selectedUser.fullName || !this.selectedUser.email || !this.selectedUser.password;
  }

  onSubmit() {
    this.loginService.register(this.selectedUser)
      .subscribe(res => {
        const response: any = res;
        console.log(response);
        this.showMessage('Registered successfully');
        this.router.navigate(['/login']);
      }, err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.join('<br/>');
          this.showMessage(this.serverErrorMessage);
        } else {
          this.showMessage('Something went wrong. Please contact admin.');
        }
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
    this.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    this.regForm.resetForm();
    this.serverErrorMessage = '';
  }

}
