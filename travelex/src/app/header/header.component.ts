import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticate;
  userDetails;

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.isAuthenticate = true;
      this.loginService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => {}
      );
    }
  }

  constructor(public loginService: LoginService, public router: Router) {
  }

  onLogout() {
    this.isAuthenticate = false;
    this.loginService.deleteToken();
    this.router.navigate(['/login']);
  }
}
