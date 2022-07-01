import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginPage: boolean;
  userEmail: string;
  isAuthenticated: boolean;



  constructor(public authService: AuthService) {
  }



  ngOnInit(): void {
    this.authService.getPageStatus()
      .subscribe(pageStatus => this.loginPage = pageStatus)

    this.authService.logEmail()
      .subscribe(email => this.userEmail = email)

    this.authService.isAuthenticatedCheck()
      .subscribe(isAuth => this.isAuthenticated = isAuth)
    console.log('header', this.isAuthenticated)
  }

  onLogoutClick() {
    this.authService.logout()
  }
}
