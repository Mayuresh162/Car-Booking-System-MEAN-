import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  newUser = {
    email: '',
    password: ''
  };
  serverErrorMessage: string;

  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public loginService: LoginService, public router: Router,
    private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(queryParams => {
      console.log(queryParams);
    });
  }

  shouldDisable() {
    return !this.newUser.email || !this.newUser.password;
  }

  onSubmit() {
    this.loginService.login(this.newUser)
      .subscribe(res => {
        const response: any = res;
        console.log(response);
        this.loginService.setToken(res['token']);
        this.router.navigate(['/payment']);
      }, err => {
        this.serverErrorMessage = err.error.message;
        this.showMessage(this.serverErrorMessage);
        if (this.serverErrorMessage == 'Email is not registered') {
          this.router.navigate(['/register']);
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
    this.newUser = {
      email: '',
      password: ''
    };
    this.loginForm.resetForm();
    this.serverErrorMessage = '';
  }
}
